import { useState } from "react";
import styles from "@/components/counter/styles.module.css";
import client from "@/client/axios";

type InputComponentProps = {
  id: string;
};

/**
 * InputComponent is a React component that allows users to add and update data,
 * and fetch counts related to the data.
 *
 * @component
 * @example
 * return (
 *   <InputComponent id="1" />
 * )
 */
export default function InputComponent({ id }: InputComponentProps) {
  // State to manage the input value
  const [inputValue, setInputValue] = useState("");
  // State to manage the counts for add and update operations
  const [count, setCount] = useState<{
    addCount: 0;
    updateCount: 0;
  } | null>(null);

  /**
   * Handle the add operation by sending a POST request with the input data.
   */
  const handleAdd = () => {
    try {
      client.post(`/`, { data: inputValue, instanceId: id });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handle the update operation by sending a PUT request with the input data.
   */
  const handleUpdate = () => {
    try {
      client.put(`/${id}`, { data: inputValue, instanceId: id });
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Fetch the counts for add and update operations from the server.
   */
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
