class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.statusCode = statusCode < 400; //All the status codes below 400 are success true codes
  }
}

export { ApiResponse };
