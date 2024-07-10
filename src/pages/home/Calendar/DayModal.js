import React, { useEffect, useState } from "react";
import styles from "../../../styles/DayModal.module.css";
import { FaTrashCan } from "react-icons/fa6";
import postItIcon from "../../../images/post-it.png";
import FlashcardModal from "./FlashcardModal";
import { fetchTestsForEvent } from "../../../services (for backend)/ScheduleService.js";

function DayModal({ date, events, handleDeleteClicked }) {
  const [formattedDate, setFormattedDate] = useState("");

  const [isFlashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]);

  // Format the date when component mounts or when date changes

  useEffect(() => {
    const formatted = new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setFormattedDate(formatted);
  }, [date]);

  const handleEventClick = async (event) => {
    try {
      console.log(event);
      const tests = await fetchTestsForEvent(event.id[0], event.id[1]);
      console.log("Tests fetched successfully:", tests);
      setSelectedTests(tests);
      setFlashcardModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch tests:", error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <img
        alt="picture-of-a-post-it"
        className={styles.postItIcon}
        src={postItIcon}
      />
      <FlashcardModal
        isOpen={isFlashcardModalOpen}
        tests={selectedTests}
        onClose={() => setFlashcardModalOpen(false)}
      />
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>Today's Events</div>
        <div className={styles.modalDate}>{formattedDate}</div>
        <div
          className={`${styles.eventsContainer} ${
            events.length === 0 ? styles.noEvents : styles.haveEvents
          }`}
        >
          {events.map((event) => (
            <div key={event.id} className={styles.eventItem}>
              <button
                className={styles.eventTitle}
                onClick={() => handleEventClick(event)}
              >
                {event.title}
              </button>
              <button
                onClick={() => handleDeleteClicked(event)}
                className={styles.deleteButton}
              >
                <FaTrashCan style={{ opacity: 0.5 }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DayModal;
