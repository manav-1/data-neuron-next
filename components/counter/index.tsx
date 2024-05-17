import { useState, useEffect } from "react";
import styles from "@/components/counter/styles.module.css";

type InputComponentProps = {
  id: string;
};

const InputComponent = ({ id }: InputComponentProps) => {
  const [inputValue, setInputValue] = useState("");

  // Simulate fetching value from API
  useEffect(() => {
    // Replace with actual API call
    const fetchValueFromAPI = async () => {};

    fetchValueFromAPI();
  }, []);

  const handleAdd = () => {};

  const handleUpdate = () => {};

  return (
    <div className={styles.counterContainer}>
      <p>This is input {id}</p>
      <input
        name={id}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className={styles.counterButtons}>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default InputComponent;
