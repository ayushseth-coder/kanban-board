# Sprint 05 – Kanban Task Board

## 📌 Project Overview

This project is a **Trello-style Kanban Task Board** built using **React.js**
as part of **Sprint 05**.

The goal of this sprint is to demonstrate:
- State-driven UI development
- Component-based architecture
- Mastery of React hooks (useState, useEffect)
- Clean data flow using props
- Professional UI/UX practices

---

## 🧰 Tech Stack

- React (Functional Components)
- Vite (Project Initialization)
- JavaScript (ES6+)
- Tailwind CSS / Bootstrap (UI only)
- Browser localStorage
- Drag and Drop library (dnd-kit or react-beautiful-dnd)

---

---

## important link 
github respository link-- https://github.com/ayushseth-coder/kanban-board.git

Live demo Link--

video link--

---

## 🚀 Features Implemented

### ✅ Phase 1 – Base MVP
- 3-column Kanban Board (To Do, In Progress, Done)
- Add new tasks
- Delete tasks
- Move tasks between columns
- State-driven rendering

### 🎨 Phase 2 – UI/UX & Persistence
- Inline task editing
- Priority system (High, Medium, Low)
- Conditional styling based on priority
- Persistent state using localStorage

### 🧠 Phase 3 – Advanced Interactions
- Drag-and-drop task movement
- Global task search and filtering
- Real-time UI updates

---

## 🧱 Component Structure

- App (Global State Owner)
- Board
- Column
- TaskCard
- TaskInput
- SearchBar

State is lifted to the highest required parent and passed down via props.

---

## 💾 State Persistence

All task data is stored in browser `localStorage`.  
The board state persists even after a full page refresh.

---

## 📦 Installation & Setup

```bash
npm install
npm run dev


## ✅ Compliance

- Sprint 05 email rules strictly followed  
- All 3 phases completed  
- Only allowed technologies used  
- AI used only for **guidance and understanding**