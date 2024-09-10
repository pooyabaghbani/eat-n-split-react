import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
  const [newFriendsObj, setNewFriendsObj] = useState([...initialFriends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function onAddFriend() {
    setIsOpenAddFriend(!isOpenAddFriend);
  }

  function handleSelection(friend) {
    setSelectedFriend(selected => (selected?.id === friend.id ? null : friend));
    setIsOpenAddFriend(false);
  }

  function handleSplitBill(value) {
    setNewFriendsObj(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <Friends
        onAddFriend={onAddFriend}
        isOpenAddFriend={isOpenAddFriend}
        setIsOpenAddFriend={setIsOpenAddFriend}
        newFriendsObj={newFriendsObj}
        setNewFriendsObj={setNewFriendsObj}
        onSelection={handleSelection}
        selectedFriend={selectedFriend}
      />
      {selectedFriend && (
        <SplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}

function Friends({
  onAddFriend,
  isOpenAddFriend,
  setIsOpenAddFriend,
  newFriendsObj,
  setNewFriendsObj,
  onSelection,
  selectedFriend,
}) {
  return (
    <>
      <div className="sidebar">
        <ul>
          {newFriendsObj.map(friend => (
            <Friend
              friend={friend}
              onSelection={onSelection}
              key={friend.id}
              selectedFriend={selectedFriend}
            />
          ))}
        </ul>

        {isOpenAddFriend && (
          <AddFriend
            isOpenAddFriend={isOpenAddFriend}
            setIsOpenAddFriend={setIsOpenAddFriend}
            newFriendsObj={newFriendsObj}
            setNewFriendsObj={setNewFriendsObj}
          />
        )}

        <Button onClick={onAddFriend}>
          {isOpenAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
    </>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  let balanceText;
  if (friend.balance === 0) balanceText = `You and ${friend.name} are even`;
  if (friend.balance > 0)
    balanceText = `${friend.name} owes you ${friend.balance}$`;
  if (friend.balance < 0)
    balanceText = `You owe ${friend.name} ${friend.balance}$`;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance === 0 ? "" : "red"
        }
      >
        {balanceText}
      </p>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend({ setIsOpenAddFriend, newFriendsObj, setNewFriendsObj }) {
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendImg, setNewFriendImg] = useState("");

  function newFriend(e) {
    e.preventDefault();

    const newFriend = {
      id: Date.now(),
      name: newFriendName,
      image: newFriendImg,
      balance: 0,
    };

    setNewFriendsObj([...newFriendsObj, newFriend]);

    setIsOpenAddFriend(false);
  }
  return (
    <div>
      <form className="form-add-friend" onSubmit={e => newFriend(e)}>
        <label>🧑🏻‍🤝‍👩🏻Friend name</label>
        <input
          type="text"
          value={newFriendName}
          onChange={e => setNewFriendName(e.target.value)}
        />
        <label>🖼️Image URL</label>
        <input
          type="text"
          value={newFriendImg}
          onChange={e => setNewFriendImg(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function SplitBill({ friend, onSplitBill }) {
  const [bill, setBill] = useState();
  const [paidByUser, setPayedByUser] = useState();
  const paidByFriend = bill && bill - paidByUser;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>
      <label>💰Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={e => setBill(+e.target.value)}
      />
      <label>🧍‍♂️Your expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={e =>
          setPayedByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />
      <label>🧑🏻‍🤝‍👩🏻{friend.name} expense</label>
      <input type="number" disabled value={paidByFriend} />
      <label>🤑Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
