// HomePage.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import SearchBox from "../components/searchBox";
import JournalBox from "../components/journalBox";
import PlusButton from "../components/plusButton";
import JournalModal from "../components/journalModal";
import AlertMessage from "../components/alertMessage"; // Import the AlertMessage component
import axios from "axios";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingJournal, setEditingJournal] = useState(null);
  const [alertMessage, setAlertMessage] = useState(""); // Initialize alertMessage state with an empty string

  const handleEdit = (journal) => {
    setEditingJournal(journal);
    setIsModalOpen(true);
  };

  const getJournals = async () => {
    try {
      const response = await axios.get("http://localhost:8000/journal");
      setJournals(response.data);
    } catch (error) {
      console.log("There was an error fetching the journals", error);
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
    setEditingJournal(null);
  };

  const handleJournalDeleted = () => {
    getJournals();
  };

  useEffect(() => {
    if (alertMessage) {
      console.log(alertMessage);
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      
      // Clear the timer when the component unmounts or when the alert message changes
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="bg-[#D6D5C5] h-screen overflow-auto relative"> 
      <Navbar />
      {alertMessage && <AlertMessage message={alertMessage} />}
      <SearchBox setSearchQuery={setSearchQuery} />
      <div className="flex flex-wrap flex-row gap-6 h-screen pl-28">
        {journals
          .filter((journal) =>
            journal.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((journal) => (
            <JournalBox
              key={journal._id}
              journalId={journal._id}
              title={journal.title}
              color={journal.color}
              shortDescription={journal.shortDescription}
              pattern={journal.pattern}
              onJournalDeleted={handleJournalDeleted}
              onEdit={handleEdit}
              setAlertMessage={setAlertMessage}
            />
          ))}
      </div>
      <PlusButton onClick={openModal} />
      <JournalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onJournalCreated={handleJournalCreated}
        editingJournal={editingJournal}
        setAlertMessage={setAlertMessage} 
      />
    </div>
  );
}
