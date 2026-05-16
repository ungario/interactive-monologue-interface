"use client";

import { useEffect, useState } from "react";

type ProjectProps = {
    item: ProjectItem;
};

type ProjectImagePreviewProps = {
    image: string;
    projectTitle: string;
    onClose: () => void;
};

function ProjectImagePreview({
    image,
    projectTitle,
    onClose,
}: ProjectImagePreviewProps) {
    return (
        <div
            className="project-modal-backdrop"
            onClick={onClose}
        >
            <div
                className="project-modal"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <button
                    type="button"
                    className="project-modal-close"
                    aria-label="Close image preview"
                    onClick={onClose}
                >
                    Close
                </button>
                <img
                    className="project-modal-image"
                    src={`/projects/${image}`}
                    alt={`${projectTitle} screenshot expanded`}
                />
            </div>
        </div>
    );
}

export default function Project({ item }: ProjectProps) {
    const images = item.images ?? [];
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedImage) return;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage]);

    return (
        <div className="project-section">
            <div className="chat-bubble-pfpspacer"></div>
            <div className="project-container">
                <div className="project-header">
                    <p className="project-time">{item.date}</p>
                    <div className="project-title">
                        <h2>{item.title}</h2>
                        {item.subtitle ? <p>{item.subtitle}</p> : null}
                    </div>
                </div>
                {images.length > 0 ? (
                    <div className="project-images-wrapper">
                        <div className="project-images">
                            <div className="pre-scroll-spacer"></div>
                            <div className="chat-bubble-pfpspacer"></div>
                            {images.map((image) => (
                                <button
                                    key={image}
                                    type="button"
                                    className="project-image-button"
                                    onClick={() => {
                                        setSelectedImage(image);
                                    }}
                                >
                                    <img
                                        className="project-image"
                                        src={`/projects/${image}`}
                                        alt={`${item.title} screenshot`}
                                        loading="lazy"
                                        onError={(event) => {
                                            const button =
                                                event.currentTarget
                                                    .parentElement;
                                            if (button instanceof HTMLElement) {
                                                button.style.display = "none";
                                            }
                                        }}
                                    />
                                </button>
                            ))}
                            <div className="post-scroll-spacer"></div>
                        </div>
                    </div>
                ) : null}
            </div>
            {selectedImage ? (
                <ProjectImagePreview
                    image={selectedImage}
                    projectTitle={item.title}
                    onClose={() => {
                        setSelectedImage(null);
                    }}
                />
            ) : null}
        </div>
    );
}
