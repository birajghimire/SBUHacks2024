import React, { useState } from "react";
import Navbar from "../components/navbar";
import SearchBox from "../components/searchBox";
import JournalBox from "../components/journalBox";
import PlusButton from "../components/plusButton"; 
import JournalModal from "../components/journalModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <JournalBox />
        <JournalBox />
        <JournalBox />
        <JournalBox />
        <JournalBox />
      </div>
      <PlusButton onClick={openModal} />
      <JournalModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
