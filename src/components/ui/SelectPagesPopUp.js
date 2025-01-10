import React, { useState, useRef, useEffect } from "react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/build/pdf";

GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const SelectPagesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);

  const canvasRefs = useRef([]);
  const scale = 0.25;

  // Function to render pages
  const renderPages = async () => {
    if (pdfDoc) {
      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRefs.current[i - 1];
        const ctx = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };

        await page.render(renderContext).promise;
      }
    }
  };

  useEffect(() => {
    if (pdfDoc) {
      renderPages();
    }
  }, [pdfDoc]);

  // Handle file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdf = await getDocument({ data: pdfData }).promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setSelectedPages([]);
        setIsOpen(true);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Toggle page selection
  const togglePageSelection = (pageIndex) => {
    setSelectedPages((prev) => {
      if (prev.includes(pageIndex)) {
        return prev.filter((p) => p !== pageIndex);
      } else {
        return [...prev, pageIndex];
      }
    });
  };

  // Select or unselect all pages
  const toggleSelectAll = () => {
    if (selectedPages.length === numPages) {
      setSelectedPages([]);
    } else {
      setSelectedPages(Array.from({ length: numPages }, (_, i) => i));
    }
  };

  // Handle Generate action
  const handleGenerate = async () => {
    try {
      console.log("Selected pages:", selectedPages);
      // ... any logic for generating from selected pages
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

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
            // Outer container for the dialog
            style={{
              position: "relative",
              padding: "1rem",
              width: "100%",
              maxWidth: "768px", // approximate "max-w-3xl"
              maxHeight: "80vh", // limit total height
              backgroundColor: "white", // so scrollbar appears over a white background
              borderRadius: "0.5rem", // ~rounded-lg
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)", // ~shadow
              display: "flex",
              flexDirection: "column", // ensure header, body, footer stack vertically
            }}
          >
            {/* Modal header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem", // ~ p-5
                borderBottom: "1px solid #e5e7eb", // ~border-b, ~border-gray-200
                borderTopLeftRadius: "0.5rem",
                borderTopRightRadius: "0.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem", // ~text-xl
                  fontWeight: 600, // ~font-semibold
                  color: "#111827", // ~text-gray-900
                }}
              >
                Select Pages to Generate
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                style={{
                  color: "#9CA3AF", // ~text-gray-400
                  backgroundColor: "transparent", // ~bg-transparent
                  borderRadius: "0.5rem", // ~rounded-lg
                  fontSize: "0.875rem", // ~text-sm
                  width: "2rem", // ~w-8
                  height: "2rem", // ~h-8
                  marginLeft: "auto", // ~ms-auto
                  display: "inline-flex", // ~inline-flex
                  alignItems: "center", // ~items-center
                  justifyContent: "center", // ~justify-center
                  cursor: "pointer",
                  border: "none",
                }}
              >
                <svg
                  style={{ width: "0.75rem", height: "0.75rem" }} // ~w-3 h-3
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

            {/* Modal body */}
            <div
              style={{
                flex: 1, // Allow body to grow and fill available space
                padding: "1.25rem", // ~p-5
                overflowY: "auto", // Allow scrolling inside the body
                display: "flex",
                flexDirection: "column",
                gap: "1rem", // ~space-y-4
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end", // ~justify-end
                }}
              >
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  style={{
                    fontSize: "0.875rem", // ~text-sm
                    fontWeight: 500, // ~font-medium
                    color: "#3B82F6", // ~text-blue-500
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
                  display: "grid", // ~grid
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))", // ~grid-cols-3
                  gap: "0.75rem", // ~gap-3
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
                      {/* Page Number */}
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
                      {/* Canvas */}
                      <canvas
                        ref={(el) => (canvasRefs.current[index] = el)}
                        style={{
                          display: "block",
                          margin: "auto",
                        }}
                      />
                      {/* Selection Circle */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          background: pageSelected ? "#1d4ed8" : "#ffffff",
                          border: "1px solid black",
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal footer */}
            <div
              style={{
                position: "sticky",
                bottom: 0, // Ensure the footer sticks to the bottom of the modal
                padding: "1.25rem", // ~p-5
                borderTop: "1px solid #e5e7eb", // ~border-t
                borderBottomLeftRadius: "0.5rem", // ~rounded-b
                borderBottomRightRadius: "0.5rem", // ~rounded-b
                backgroundColor: "white", // Ensure footer has the same background
                zIndex: 10, // Keep it above scrolling content
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem", // ~space-x-3
              }}
            >
              <button
                onClick={toggleModal}
                type="button"
                style={{
                  paddingTop: "0.625rem", // ~py-2.5
                  paddingBottom: "0.625rem",
                  paddingLeft: "1.25rem", // ~px-5
                  paddingRight: "1.25rem",
                  fontSize: "0.875rem", // ~text-sm
                  fontWeight: 500, // ~font-medium
                  color: "#111827", // ~text-gray-900
                  backgroundColor: "#ffffff", // ~bg-white
                  borderRadius: "0.5rem", // ~rounded-lg
                  border: "1px solid #e5e7eb", // ~border-gray-200
                  outline: "none", // ~focus:outline-none
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                type="button"
                style={{
                  color: "#ffffff", // ~text-white
                  backgroundColor: "#3B82F6", // ~bg-blue-500
                  fontWeight: 500, // ~font-medium
                  borderRadius: "0.5rem", // ~rounded-lg
                  fontSize: "0.875rem", // ~text-sm
                  padding: "0.625rem 1.25rem", // ~py-2.5 px-5
                  outline: "none", // ~focus:outline-none
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
