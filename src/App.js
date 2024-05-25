import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description)
      return alert(
        "Item field is empty! Fill it if you want to add a new item 😊"
      );
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        <input type="checkbox" onClick={() => (item.packed = true)} />{" "}
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed);
  const packedItemsPercent = Math.trunc(
    (packedItems.length / items.length) * 100
  );

  return (
    <footer className="stats">
      <em>
        🎒 You have {items.length} {items.length < 2 ? "item" : "items"} on your
        list, and you already pack {packedItems.length} (
        {items.length === 0 ? "0" : packedItemsPercent}%)
      </em>
    </footer>
  );
}
