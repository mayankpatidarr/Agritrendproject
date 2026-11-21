const { spawn } = require('child_process');
const path = require('path');

exports.runModelPrediction = (req, res) => {
  console.log("running run model controller");

  const inputData = JSON.stringify(req.body);
  const scriptPath = path.join(__dirname, '..', 'final_priceprediction.py');

  // Explicitly use virtual environment Python
  const pythonExec = path.join(__dirname, '..', 'cppbackend_env', 'Scripts', 'python.exe'); // Windows
const pythonProcess = spawn(pythonExec, [scriptPath, inputData]);


  let result = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => { result += data.toString(); });
  pythonProcess.stderr.on('data', (data) => { error += data.toString(); });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Python script error:', error);
      return res.status(500).json({ error: 'Prediction failed', details: error });
    }
    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
    } catch {
      console.error('Failed to parse model output:', result);
      res.status(500).json({ error: 'Invalid model output', raw: result });
    }
  });
};
