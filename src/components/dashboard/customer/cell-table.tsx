'use client';

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button"; // Import MUI Button
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import "../../../../celltable.css";
import Timeline from "./timeline"; // Adjust the import path as needed
import { Typography } from "@mui/material";

// Define TypeScript interfaces for Plate and Grade
interface Plate {
    number: string;
    grades: string[];
}

// Main Component definition
const CellTable: React.FC = () => {
    const cardData = [[
        {
            grade: "C",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "A", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
        { grade: "B", wash: "Wash", dateTime: "2024-03-11 19:04:12" },
        {
            grade: "C",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "A", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
    ], [
        {
            grade: "D",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "A", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
        { grade: "B", wash: "Wash", dateTime: "2024-03-11 19:04:12" },
        {
            grade: "D",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "A", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
    ], [
        {
            grade: "B",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "C", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
        { grade: "A", wash: "Wash", dateTime: "2024-03-11 19:04:12" },
        {
            grade: "D",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "A", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
    ], [
        {
            grade: "A",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "A", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
        { grade: "B", wash: "Wash", dateTime: "2024-03-11 19:04:12" },
        {
            grade: "C",
            wash: "Wash",
            dateTime: "2024-02-11 17:00:52",
            replace: "Replaced with Grade A",
        },
        { grade: "B", wash: "Wash", dateTime: "2024-02-11 17:16:48" },
    ]];

    // Sample data for 5 plates with typing
    const plates: Plate[] = [
        {
            number: "1",
            grades: [
                "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A",
            ],
        },
        {
            number: "2",
            grades: [
                "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "C", "A", "A", "A", "B", "A", "A", "A", "A", "C", "A",
            ],
        },
        {
            number: "3",
            grades: [
                "A", "A", "B", "A", "A", "A", "A", "C", "A", "A", "A", "B", "A", "A", "A", "A", "C", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A",
            ],
        },
        {
            number: "4",
            grades: [
                "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "C", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A",
            ],
        },
        {
            number: "5",
            grades: [
                "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "C", "A", "A", "A", "A", "A", "A", "B", "A", "A", "A", "A", "A", "A", "A", "A", "B", "A", "A",

            ],
        },
    ];

    // State to manage the selected plate number
    const [selectedPlate, setSelectedPlate] = useState<string | null>(null);

    // Function to handle row click
    const handleRowClick = (plateNumber: string) => {
        setSelectedPlate(plateNumber);
    };

    // Function to handle the "Back" button click
    const handleBackClick = () => {
        setSelectedPlate(null);
    };

    // Function to determine the color based on the grade
    const getGradeColor = (grade: string): string => {
        switch (grade) {
            case "A":
                return "green";
            case "B":
                return "yellow";
            case "C":
            case "D":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <div className="plate-table-container">
            {selectedPlate ? (
                <div>
                    <Button
                        variant="contained"
                        startIcon={<ArrowLeft />}
                        onClick={handleBackClick}
                        sx={{ mb: 2 }} // Adds a small margin below the button
                    >
                        Back to Table
                    </Button>
                    <h1 >Cell no. {selectedPlate}</h1>

                    {cardData.map((cards, index) => {
                        console.log("check cards", cards)
                        return (

                            <Timeline key={index} plateNumber={`0${index + 1}`} cards1={cards} cell={selectedPlate} />
                        )
                    })}
                </div>
            ) : (
                <table className="plate-table">
                    <thead>
                        <tr>
                            <th className="plate-column">Plate Group</th>
                            <th colSpan={4}>A1</th>
                            <th colSpan={4}>A2</th>
                            <th colSpan={4}>A3</th>
                        </tr>
                        <tr>
                            <th className="plate-column">Plate Grade</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plates.map((plate, index) => (
                            <tr
                                key={index}
                                onClick={() => handleRowClick(plate.number)}
                                style={{ cursor: "pointer" }} // Makes the row look clickable
                            >
                                <td className="plate-cell">
                                    <div className="plate-number">{plate.number}</div>
                                    <div className="plate-grades">
                                        {plate.grades.map((grade, gradeIndex) => (
                                            <span
                                                key={gradeIndex}
                                                className="grade-indicator"
                                                style={{ backgroundColor: getGradeColor(grade) }}
                                            ></span>
                                        ))}
                                    </div>
                                </td>
                                {["A1", "A2", "A3"].flatMap((section) =>
                                    ["A", "B", "C", "D"].map((grade) => (
                                        <td key={`${section}${grade}`}>
                                            {Math.floor(Math.random() * 20) + 1}
                                        </td>
                                    ))
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CellTable;
