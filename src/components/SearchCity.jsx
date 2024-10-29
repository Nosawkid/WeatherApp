import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

const SearchCity = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Container
      className="py-3"
      style={{ backgroundColor: "#e7f3ff", textAlign: "center" }}
      fluid
    >
      {" "}
      <h3>Search for a city</h3>
      <InputGroup className="mb-3" style={{ width: "40%", margin: "0 auto" }}>
        <Form.Control
          placeholder="Enter a city"
          aria-label="City name"
          aria-describedby="search-bar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          onClick={() => onSearch(searchValue)}
          style={{ width: "20%" }}
          variant="primary"
        >
          <i
            style={{ fontSize: "20px" }}
            className="fa-solid fa-magnifying-glass-location"
          ></i>
        </Button>
      </InputGroup>
    </Container>
  );
};

export default SearchCity;
