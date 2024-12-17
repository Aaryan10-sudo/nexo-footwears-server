export const handleSingleFileController = async (req, res, next) => {
  try {
    let link = `http://localhost:3333/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
      result: link,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const handleMultipleFileController = async (req, res, next) => {
  try {
    let link = req.files.map((value, index) => {
      return `http://localhost:3333/${value.filename}`;
    });
    res.status(200).json({
      success: true,
      message: "Files Uploaded Successfully",
      result: link,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
