class ApiResponse {
  static ok(res, message, data = null) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, message, data = null) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res) {
    return res.status(204).send();
  }
  static redirect(res, url) {
    return res.status(302).redirect(url);
  }
}

export default ApiResponse;
