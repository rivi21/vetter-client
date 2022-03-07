import { Button } from "components/buttons";
import { Input } from "components/forms";
import useFetch from "hooks/useFetch.hook";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER } from "services/settings";
import "./NewPetForm.scss";

export default function NewPetForm({ ownerId, setPets, setShowForm }) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [vaccinationStatus, setVaccinationStatus] = useState("");
  const [gender, setGender] = useState("");
  const [spayedOrNeutered, setSpayedOrNeutered] = useState("");

  const [loading, setLoading] = useState(false);

  const { post } = useFetch(SERVER);

  const navigate = useNavigate();

  const handleNewPetSubmit = (event) => {
    event.preventDefault();

    const newPet = {
      owner_id: ownerId ?? 0,
      name,
      birth_date: birthDate,
      species,
      breed,
      color,
      vaccination_status: vaccinationStatus,
      gender,
      spayed_or_neutered: spayedOrNeutered,
    };

    (async () => {
      try {
        setLoading(true);

        const data = await post("pets", newPet);
        console.log("Post pet", data);

        setLoading(false);

        if (ownerId) {
          setPets((pets) => [...pets, data]);
          setShowForm(false);
        } else {
          navigate(`/dashboard/pets/${data.id}`);
        }
      } catch (error) {
        setLoading(false);

        console.error(error);
      }
    })();
  };

  return (
    <form className="NewPetForm" onSubmit={handleNewPetSubmit}>
      <Input
        placeholder="Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus
      />
      <Input
        placeholder="Birth Date"
        type="date"
        value={birthDate}
        onChange={(event) => setBirthDate(event.target.value)}
      />
      <Input
        placeholder="Species"
        required
        value={species}
        onChange={(event) => setSpecies(event.target.value)}
      />
      <Input
        placeholder="Breed"
        value={breed}
        onChange={(event) => setBreed(event.target.value)}
      />
      <Input
        placeholder="Color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
      <Input
        placeholder="Vaccination Status"
        required
        value={vaccinationStatus}
        onChange={(event) => setVaccinationStatus(event.target.value)}
      />
      <Input
        placeholder="Gender"
        required
        value={gender}
        onChange={(event) => setGender(event.target.value)}
      />
      <Input
        placeholder="Spayed or Neutered"
        required
        value={spayedOrNeutered}
        onChange={(event) => setSpayedOrNeutered(event.target.value)}
      />
      <Button type="submit" disabled={loading}>
        Add New Pet
      </Button>
    </form>
  );
}