"use client";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.main`
  min-height: 100vh;
  background-color: #f3f4f6;
  color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 24rem;
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af;
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  text-align: center;
`;

const Result = styled.div`
  margin-top: 1rem;
  text-align: center;
  word-break: break-word;
`;

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, alias }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setShortUrl(`${window.location.origin}/${data.alias}`);
  };

  return (
      <Container>
        <Card>
          <Title>URL Shortener</Title>
          <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Custom alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />
            <Button type="submit">Shorten</Button>
          </Form>
          {error && <ErrorText>{error}</ErrorText>}
          {shortUrl && (
              <Result>
                <p>Shortened URL:</p>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </Result>
          )}
        </Card>
      </Container>
  );
}
