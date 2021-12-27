import { Button } from "components/buttons";
import { Input } from "components/forms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPatientForm.scss";

export default function NewPatientForm() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const navigate = useNavigate();

  const handleNewPatientSubmit = (event) => {
    event.preventDefault();

    // TODO: backend

    navigate("/dashboard/patients");
  };

  return (
    <form className="NewPatientForm" onSubmit={handleNewPatientSubmit}>
      <Input
        placeholder="Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        placeholder="Birth Date"
        type="date"
        value={birthDate}
        onChange={(event) => setBirthDate(event.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
