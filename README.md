# Fake Currency Detection System (Front-End)

This project is a web-based **Fake Currency Detection System** designed to leverage AI technology for analyzing and verifying the authenticity of currency notes. Users can upload images of currency notes for real-time analysis, and the system provides detailed results indicating the likelihood of the note being genuine or counterfeit.

---

## Features

### **Main Functionality**
- **Currency Image Upload**: Users can upload images of currency notes in three ways:
  - Drag-and-drop from their device
  - Selecting files directly
  - Capturing images using their camera
- **AI Analysis**: Advanced algorithms analyze uploaded images for multiple security features:
  - Watermarks
  - Serial numbers
  - Security threads
  - Microprinting
- **Authentication Results**: Results include:
  - Confidence percentages for each detected security feature
  - A clear indication of whether the currency is genuine or potentially counterfeit

### **User Interface**
- **Modern Design**: Features a sleek and responsive layout with:
  - Gradient background and animated blobs
  - Glass-morphism cards for an elegant look
- **Interactive Upload Area**: Drag-and-drop and camera integration make image uploading intuitive
- **Visual Feedback**: Real-time loading animations and color-coded results:
  - **Green** for genuine
  - **Red** for counterfeit

---

## Technologies Used

- **React**: Framework for building a dynamic and interactive user interface
- **TypeScript**: Adds static typing for better maintainability and error prevention
- **Tailwind CSS**: Utility-first framework for styling
- **Shadcn UI**: Library for modern, pre-built UI components
- **Vite**: A fast build tool and development server for a seamless development experience

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone <YOUR_GIT_URL>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd <YOUR_PROJECT_NAME>
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

---

## Deployment

This project can be deployed to any hosting provider that supports static web apps or JavaScript frameworks.

### Deployment Steps:

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder to your hosting platform (e.g., Netlify, Vercel).

---

