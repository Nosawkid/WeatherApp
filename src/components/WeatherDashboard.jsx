import { Container, Row, Col, Card } from "react-bootstrap";
import {
  Droplets,
  Wind,
  Eye,
  Sunrise,
  Sunset,
  Thermometer,
} from "lucide-react";
import Feedback from "./Feedback";

// Utility function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

// Utility function to format timestamp to local time
const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const WeatherDashboard = ({ weatherData }) => {
  if (weatherData.error) {
    return <Feedback message={"No City found, try again !"} />;
  }

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <Card.Header>
          <h2 className="mb-0">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="d-flex align-items-center mb-3 mb-md-0">
              <Thermometer size={32} className="text-primary me-3" />
              <div>
                <h3 className="display-4 mb-0">
                  {kelvinToCelsius(weatherData.main.temp)}°C
                </h3>
                <p className="text-muted">
                  Feels like {kelvinToCelsius(weatherData.main.feels_like)}°C
                </p>
              </div>
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                style={{ width: "64px", height: "64px" }}
              />
              <div>
                <h4 className="text-capitalize mb-1">
                  {weatherData.weather[0].main}
                </h4>
                <p className="text-muted text-capitalize mb-0">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center">
                <Droplets size={24} className="text-primary me-3" />
                <div>
                  <p className="text-muted mb-1">Humidity</p>
                  <h5 className="mb-1">{weatherData.main.humidity}%</h5>
                  <small className="text-muted">
                    Pressure: {weatherData.main.pressure} hPa
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Wind */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center">
                <Wind size={24} className="text-primary me-3" />
                <div>
                  <p className="text-muted mb-1">Wind Speed</p>
                  <h5 className="mb-1">{weatherData.wind.speed} m/s</h5>
                  <small className="text-muted">
                    Gusts: {weatherData.wind.gust} m/s
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Visibility & Clouds */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center">
                <Eye size={24} className="text-primary me-3" />
                <div>
                  <p className="text-muted mb-1">Visibility</p>
                  <h5 className="mb-1">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </h5>
                  <small className="text-muted">
                    Cloud Cover: {weatherData.clouds.all}%
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sunrise/Sunset Card */}
      <Card>
        <Card.Body>
          <Row className="justify-content-around">
            <Col xs="auto" className="text-center">
              <div className="d-flex align-items-center">
                <Sunrise size={24} className="text-warning me-2" />
                <div>
                  <p className="text-muted mb-1">Sunrise</p>
                  <h5 className="mb-0">
                    {formatTime(weatherData.sys.sunrise)}
                  </h5>
                </div>
              </div>
            </Col>
            <Col xs="auto" className="text-center">
              <div className="d-flex align-items-center">
                <Sunset size={24} className="text-warning me-2" />
                <div>
                  <p className="text-muted mb-1">Sunset</p>
                  <h5 className="mb-0">{formatTime(weatherData.sys.sunset)}</h5>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WeatherDashboard;
