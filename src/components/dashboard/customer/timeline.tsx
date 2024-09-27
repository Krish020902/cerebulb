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
    cell: string;
}

// HoverModal component to display image on hover
const HoverModal: React.FC<{ grade: string; x: number; y: number }> = ({ grade, x, y }) => {
    const getImageByGrade = (grade: string) => {
        switch (grade) {
            case "A":
                return "/assets/gradeA.jpg"; // Directly from the public folder
            case "B":
                return "/assets/gradeB.jpg"; // Add the correct image for grade B
            case "C":
                return "/assets/gradeC.jpg"; // Add the correct image for grade C
            default:
                return "/assets/defaultImage.png"; // Add a default image if needed
        }
    };


    return (
        <div className="hover-modal" style={{ top: y, left: x }}>
            <img
                src={getImageByGrade(grade)}
                alt={`Grade ${grade} Preview`}
                style={{ width: '150px', height: '150px' }} // Adjust size here
            />
        </div>
    );
};

// ReplaceModal component
const ReplaceModal: React.FC<ReplaceModalProps> = ({ isOpen, onClose, onReplace }) => {
    const [date, setDate] = useState<string>("2023-12-17");
    const [time, setTime] = useState<string>("23:58:48");
    const [grade, setGrade] = useState<string>("A");

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
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
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

// PlateCard component with hover functionality
const PlateCard: React.FC<PlateCardProps> = ({ grade, wash, dateTime, replace }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsHovered(true);
        // Capture mouse position relative to the viewport and adjust the position above the card
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        setHoverPosition({
            x: rect.left + rect.width / 2, // Center the modal horizontally over the card
            y: rect.top - 160, // Position the modal above the card by a fixed offset (160px)
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    let cardColor = "green-card";
    if (grade === "B") {
        cardColor = "yellow-card";
    } else if (grade === "C") {
        cardColor = "red-card";
    } else if (grade === "D") {
        cardColor = "red-card";
    }

    return (
        <div
            className="plate-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
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
                {replace && replace !== '0' && <p className="replace-text">Replaced with {replace}</p>}
            </div>

            {isHovered && (
                <HoverModal grade={grade} x={hoverPosition.x} y={hoverPosition.y + 100} />
            )}
        </div>
    );
};


// Timeline component
const Timeline: React.FC<TimelineProps> = ({ cell }) => {
    const [allCards, setAllCards] = useState<PlateCardProps[][]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [platenumber, setPlateNumber] = useState<number>(1);

    // Function to fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/anode_records', { cellNumber: cell });
            const fetchedData = response.data;
            console.log("fetched data", fetchedData);

            // Store the response data as is (array of arrays)
            const formattedData = fetchedData.map((array: any[]) => array.map((item: any) => ({
                grade: item.grade,
                wash: item.wash,
                dateTime: item.dateTime,
                replace: item.replace || undefined,
            })));
            console.log("formatted card data", formattedData);

            setAllCards(formattedData);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // Fetch data when the component mounts or when `cell` changes
    useEffect(() => {
        fetchData();
    }, [cell]);

    const handleReplace = async (date: string, time: string, grade: string) => {
        console.log(`Replacing with: Date - ${date}, Time - ${time}, Grade - ${grade}`);

        try {
            const response = await axios.post('http://localhost:5000/update_anode_record', {
                cell_number: cell,
                plate_number: platenumber,  // Assuming you have this value defined elsewhere
                replace_grade: grade,  // Setting replace with the new grade
                date: date,
                time: time
            });

            console.log("Response from server:", response.data);

            setIsModalOpen(false);  // Close the modal upon success

            // Refetch the updated data after replacing
            await fetchData();
        } catch (error) {
            console.error("Error updating record", error);
        }
    };

    const handleModalOpen = (plate: number) => {
        setIsModalOpen(true);
        setPlateNumber(plate);
    };

    return (
        <>
            {allCards.map((cards, timelineIndex) => (
                <div key={timelineIndex} className="plate-display">
                    <div className="plate-header">
                        <h2>Plate no. {timelineIndex + 1}</h2>
                        <button
                            className="replace-button"
                            onClick={() => handleModalOpen(timelineIndex + 1)}
                        >
                            Replace
                        </button>
                    </div>
                    <div className="timeline">
                        {cards.map((_, index) => (
                            <React.Fragment key={index}>
                                <div className="timeline-point"></div>
                                <p className="timeline-title">
                                    Wash Cycle {(index + 1).toString().padStart(2, "0")}
                                </p>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="cards-container">
                        {cards.map((card, index) => (
                            <PlateCard key={index} {...card} />
                        ))}
                    </div>
                </div>
            ))}
            <ReplaceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onReplace={handleReplace}
            />
        </>
    );
};


export default Timeline;
