"use client";

import React, { ReactNode, CSSProperties } from "react";

type FormWrapperProps = {
  children: ReactNode;
  title?: string;
  style?: CSSProperties;
};

export default function FormWrapper({ children, title, style }: FormWrapperProps) {
  return (
    <section
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: 12,
        backgroundColor: "#FEF9F3",
        fontFamily: "Arial, sans-serif",
        ...style,
      }}
    >
      {title && (
        <h2
          style={{
            color: "#4a90e2",
            marginBottom: 24,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}