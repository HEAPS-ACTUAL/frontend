import React, { useState, useRef, useEffect } from "react";
import { getDocument } from "pdfjs-dist/build/pdf";

const SelectPagesModal = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);
  const [currentFileName, setCurrentFileName] = useState(null);

  const canvasRefs = useRef([]);
  const selectedPagesRef = useRef({}); // To track selected pages for each file

  const renderPages = async () => {
    if (!pdfDoc) return;

    const THUMBNAIL_MAX_WIDTH = 200;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const unscaledViewport = page.getViewport({ scale: 1 });
      const pageWidth = unscaledViewport.width;

      const dynamicScale = THUMBNAIL_MAX_WIDTH / pageWidth;
      const viewport = page.getViewport({ scale: dynamicScale });

      const canvas = canvasRefs.current[i - 1];
      if (!canvas) continue;

      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: ctx,
        viewport,
      };
      await page.render(renderContext).promise;
    }
  };

  useEffect(() => {
    if (pdfDoc) {
      renderPages();
    }
  }, [pdfDoc]);

  const handleFileClick = (event) => {
    event.target.value = null; // Clear the input field so that the same file can be selected again
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setCurrentFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const pdfData = new Uint8Array(e.target.result);
      const pdf = await getDocument({ data: pdfData }).promise;

      setPdfDoc(pdf);
      setNumPages(pdf.numPages);

      // Load previously selected pages for the file (if any)
      const previouslySelected = selectedPagesRef.current[file.name] || [];
      setSelectedPages(previouslySelected);

      setIsOpen(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const togglePageSelection = (pageIndex) => {
    setSelectedPages((prev) => {
      const updatedSelection = prev.includes(pageIndex)
        ? prev.filter((p) => p !== pageIndex)
        : [...prev, pageIndex];

      // Save the updated selection for the current file
      selectedPagesRef.current[currentFileName] = updatedSelection;
      return updatedSelection;
    });
  };

  const toggleSelectAll = () => {
    if (selectedPages.length === numPages) {
      setSelectedPages([]);
      selectedPagesRef.current[currentFileName] = [];
    } else {
      const allPages = Array.from({ length: numPages }, (_, i) => i);
      setSelectedPages(allPages);
      selectedPagesRef.current[currentFileName] = allPages;
    }
  };

  const handleSave = async () => {
    // console.log("Selected pages:", selectedPages);
    onSave(selectedPages);
    setIsOpen(false);
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onClick={handleFileClick}
        onChange={handleFileChange}
      />

      {isOpen && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "1rem",
              width: "100%",
              maxWidth: "768px",
              maxHeight: "80vh",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem",
                borderBottom: "1px solid #e5e7eb",
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                Select Pages to Generate
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                style={{
                  color: "#9CA3AF",
                  backgroundColor: "transparent",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  width: "2rem",
                  height: "2rem",
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <svg
                  style={{ width: "0.75rem", height: "0.75rem" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span style={{ position: "absolute", left: "-9999px" }}>
                  Close modal
                </span>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                padding: "1.25rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#3B82F6",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {selectedPages.length === numPages
                    ? "Unselect All"
                    : "Select All"}
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {Array.from({ length: numPages }, (_, index) => {
                  const pageSelected = selectedPages.includes(index);
                  return (
                    <div
                      key={index}
                      onClick={() => togglePageSelection(index)}
                      style={{
                        position: "relative",
                        border: pageSelected
                          ? "2px solid #3b82f6"
                          : "1px solid gray",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          background: "rgba(0,0,0,0.5)",
                          color: "white",
                          fontWeight: "bold",
                          padding: "2px 5px",
                          borderRadius: "3px",
                          fontSize: "12px",
                        }}
                      >
                        {index + 1}
                      </div>
                      <canvas
                        ref={(el) => (canvasRefs.current[index] = el)}
                        style={{ display: "block", margin: "auto" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                position: "sticky",
                bottom: 0,
                padding: "1.25rem",
                borderTop: "1px solid #e5e7eb",
                backgroundColor: "white",
                zIndex: 10,
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
              }}
            >
              <button
                onClick={toggleModal}
                type="button"
                style={{
                  padding: "0.625rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#111827",
                  backgroundColor: "#ffffff",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                type="button"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#3B82F6",
                  fontWeight: 500,
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  padding: "0.625rem 1.25rem",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPagesModal;
