import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SearchBox from "../components/searchBox";
import JournalBox from "../components/journalBox";
import PlusButton from "../components/plusButton";
import JournalModal from "../components/journalModal";
import axios from "axios";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journals, setJournals] = useState([]);

  const getJournals = async () => {
    try {
      const response = await axios.get("http://localhost:8000/journal");
      setJournals(response.data);
    } catch (error) {
      console.log("There was an errr fetching the journals", error);
    }
  };

  useEffect(() => {
    getJournals();
  }, []);

  const handleJournalCreated = () => {
    getJournals();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#F8F7ED] h-screen overflow-auto">
      <Navbar />
      <SearchBox />
      <div className="flex flex-wrap flex-row gap-6 h-screen pl-28">
        {journals.map((journal) => (
          <JournalBox
            key={journal._id}
            title={journal.title}
            color={journal.color}
            shortDescription={journal.shortDescription}
            pattern={journal.pattern}
          />
        ))}
      </div>
      <PlusButton onClick={openModal} />
      <JournalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onJournalCreated={handleJournalCreated}
      />
    </div>
  );
}
