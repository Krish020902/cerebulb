'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import "../../../../timeline.css";
import axios from "axios";

interface ReplaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReplace: (date: string, time: string, grade: string) => void;
}

interface PlateCardProps {
    grade: string;
    wash: string;
    dateTime: string;
    replace?: string;
}

interface TimelineProps {
    key: number;
    plateNumber: string;
    cards1: PlateCardProps[];
    cell: string;
}

// ReplaceModal component
const ReplaceModal: React.FC<ReplaceModalProps> = ({ isOpen, onClose, onReplace }) => {
    const [date, setDate] = useState<string>("2023-12-17");
    const [time, setTime] = useState<string>("23:58:48");
    const [grade, setGrade] = useState<string>("Grade A");

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Replace Plate Status</h2>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-content">
                    <div className="input-group">
                        <label>Select Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Select Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Select Grade</label>
                        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                            <option>Grade A</option>
                            <option>Grade B</option>
                            <option>Grade C</option>
                        </select>
                    </div>
                    <button
                        className="replace-button"
                        onClick={() => onReplace(date, time, grade)}
                    >
                        Replace
                    </button>
                </div>
            </div>
        </div>
    );
};

// PlateCard component
const PlateCard: React.FC<PlateCardProps> = ({ grade, wash, dateTime, replace }) => {
    let cardColor = "green-card";
    if (grade === "B") {
        cardColor = "yellow-card";
    } else if (grade === "C") {
        cardColor = "yellow-card";
    } else if (grade === "D") {
        cardColor = "red-card";
    }

    return (
        <div className="plate-card">
            <div className={`plate ${cardColor}`}>
                <div className="dots"></div>
            </div>
            <div className="card-content">
                <p className="grade-wash">
                    <strong>Grade {grade}</strong> : {wash}
                </p>
                <p className="date-time">
                    <strong>Date & Time :</strong> {dateTime}
                </p>
                {replace && <p className="replace-text">{replace}</p>}
            </div>
        </div>
    );
};

// Timeline component
const Timeline: React.FC<TimelineProps> = ({ plateNumber, cell }) => {
    const [cards, setCards] = useState<PlateCardProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/anode_records', { cellNumber: cell });
                // Assuming response data is an array of arrays as described in the previous conversation
                const fetchedData = response.data;

                const flattenedCards = fetchedData.flat().map((item: any) => ({
                    grade: item.grade,
                    wash: item.wash,
                    dateTime: item.dateTime,
                    replace: item.replace || undefined,
                }));

                setCards(flattenedCards);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [cell]);

    const handleReplace = (date: string, time: string, grade: string) => {
        console.log(
            `Replacing with: Date - ${date}, Time - ${time}, Grade - ${grade}`
        );
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="plate-display">
                <div className="plate-header">
                    <h2>Plate no. {plateNumber}</h2>
                    <button className="replace-button" onClick={() => setIsModalOpen(true)}>
                        Replace
                    </button>
                </div>
                <div className="timeline">
                    {cards.map((_, index) => (
                        <React.Fragment key={index}>
                            <div className="timeline-point"></div>
                            <p className="timeline-title">
                                Title {(index + 1).toString().padStart(2, "0")}
                            </p>
                        </React.Fragment>
                    ))}
                </div>
                <div className="cards-container">
                    {cards.map((card, index) => (
                        <PlateCard key={index} {...card} />
                    ))}
                </div>
                <ReplaceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onReplace={handleReplace}
                />
            </div>
        </>
    );
};

export default Timeline;
