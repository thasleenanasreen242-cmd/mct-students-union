"use client";

import { useMemo, useState } from "react";
import VirtualCourtroom from "./components/VirtualCourtroom";

const programmes = [
  { label: "05 YEARS", title: "BBA LL.B (Hons.)", detail: "Integrated business and law programme", semesters: "10 semesters", href: "#five-year" },
  { label: "03 YEARS", title: "LL.B (Unitary)", detail: "Undergraduate law programme", semesters: "6 semesters", href: "#three-year" },
];

const quickLinks = [
  { icon: "▤", title: "Question bank", detail: "Search and download previous papers by semester and subject", href: "#question-bank", tag: "ACADEMICS" },
  { icon: "§", title: "Smart study area", detail: "Organise papers, legal references and revision materials", href: "#study-area", tag: "STUDY" },
  { icon: "✳", title: "Grievance portal", detail: "Submit confidential complaints and track progress privately", href: "#support", tag: "SUPPORT" },
  { icon: "▦", title: "Noticeboard", detail: "View announcements, academic updates and deadlines", href: "#notices", tag: "CAMPUS" },
  { icon: "◷", title: "Events calendar", detail: "See Students&apos; Union programmes and college events", href: "#events", tag: "CAMPUS" },
  { icon: "◎", title: "Student directory", detail: "Find classmates who have chosen to be listed", href: "#directory", tag: "COMMUNITY" },
];

const notices = [
  { category: "ACADEMIC", title: "Academic resource library is being prepared", date: "COMING SOON", number: "01" },
  { category: "STUDENTS' UNION", title: "Student announcements and updates", date: "UPDATES SOON", number: "02" },
  { category: "CAMPUS LIFE", title: "Events and activities calendar", date: "COMING SOON", number: "03" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeProgramme, setActiveProgramme] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ from: "bot", text: "Hello! I can help you find question papers, programme information, notices and student support. What would you like to know?" }]);
  const sendChat = (value = chatInput) => {
    const text = value.trim();
    if (!text) return;
    const lower = text.toLowerCase();
    let answer = "I can help with the question bank, BBA LL.B and LL.B programmes, notices, events, student directory or grievance support. Try asking about one of these.";
    if (lower.includes("paper") || lower.includes("question bank") || lower.includes("previous")) answer = "The question bank is being prepared for both programmes. Use the Question bank section to find the BBA LL.B (Hons.) and LL.B (Unitary) paper collections. PDF downloads will be enabled when papers are uploaded.";
    else if (lower.includes("bba") || lower.includes("five") || lower.includes("5 year")) answer = "The BBA LL.B (Hons.) is the five-year programme, organised across 10 semesters. Visit the Programmes section for its student resource area.";
    else if (lower.includes("unitary") || lower.includes("three") || lower.includes("3 year") || lower.includes("ll.b")) answer = "The LL.B (Unitary) is the three-year programme, organised across 6 semesters. Visit the Programmes section for its student resource area.";
    else if (lower.includes("grievance") || lower.includes("complaint") || lower.includes("problem")) answer = "The grievance portal is planned for confidential submissions and private progress tracking. It will open only after secure storage and access controls are ready. For now, use the official college website for contact information.";
    else if (lower.includes("notice") || lower.includes("deadline") || lower.includes("announcement")) answer = "Academic notices and student announcements will appear on the Noticeboard. The current notice area is a preview and does not yet contain live announcements.";
    else if (lower.includes("event") || lower.includes("calendar") || lower.includes("programme")) answer = "Union programmes and college events will be listed in the Events Calendar once dates and venues are confirmed.";
    else if (lower.includes("directory") || lower.includes("classmate") || lower.includes("student")) answer = "The student directory is planned as an opt-in feature. Only students who explicitly consent will be listed.";
    setChatMessages((items) => [...items, { from: "user", text }, { from: "bot", text: answer }]);
    setChatInput("");
  };
  const filteredLinks = useMemo(() => quickLinks.filter((item) =>
    (activeProgramme === "all" || item.tag.toLowerCase() === activeProgramme) &&
    (item.title + " " + item.detail).toLowerCase().includes(query.toLowerCase())
  ), [query, activeProgramme]);

  return <VirtualCourtroom />;

