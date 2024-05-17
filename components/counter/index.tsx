import { useState } from "react";
import styles from "@/components/counter/styles.module.css";
import client from "@/client/axios";

type InputComponentProps = {
  id: string;
};

export default function InputComponent({ id }: InputComponentProps) {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState<{
    addCount: 0;
    updateCount: 0;
  } | null>(null);

  const handleAdd = () => {
    try {
      client.post(`/`, { data: inputValue, instanceId: id });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    try {
      client.put(`/${id}`, { data: inputValue, instanceId: id });
    } catch (err) {
      console.log(err);
    }
  };

  const getCount = async () => {
    try {
      const { data: count } = await client.get(`${id}/count`);
      console.log(count);
      setCount(count as any);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.counterContainer}>
      <p>This is input {id}</p>
      <input
        name={id}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {count && (
        <div>
          {<p>Add Count: {count.addCount}</p>}
          {<p>Update Count: {count.updateCount}</p>}
        </div>
      )}
      <div className={styles.counterButtons}>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={getCount}>Get Count</button>
      </div>
    </div>
  );
}
