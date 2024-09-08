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
  return (
    <div className="app">
      <Friends />
      <SplitBill />
      <AddFriend />
    </div>
  );
}

function Friends() {
  return (
    <div className="sidebar">
      <ul>
        {initialFriends.map(friend => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
      <Button>Add friend</Button>
    </div>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>you owe/even/owes</p>
      <Button>Select</Button>
    </li>
  );
}

function AddFriend() {
  const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
  return (
    isOpenAddFriend && (
      <div>
        <form className="form-add-friend">
          <label>🧑🏻‍🤝‍👩🏻Friend name</label>
          <input type="text" />
          <label>🖼️Image URL</label>
          <input type="text" />
          <Button>Add</Button>
        </form>
      </div>
    )
  );
}

function SplitBill() {
  const [isOpenSplitBill, setIsOpenSplitBill] = useState(false);
  return (
    isOpenSplitBill && (
      <form className="form-split-bill">
        <h2>Split a bill with friend.name</h2>
        <label>💰Bill value</label>
        <input type="number" />
        <label>🧍‍♂️Your expense</label>
        <input type="number" />
        <label>🧑🏻‍🤝‍👩🏻Friend.name expense</label>
        <input type="number" />
        <label>🤑Who is paying the bill</label>
        <select>
          <option>you</option>
          <option>friend</option>
        </select>
        <Button>Split bill</Button>
      </form>
    )
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}
