import { Request, Response } from 'express';
import { exec } from 'child_process';
import path from 'path';

export const processSymptoms = (req: Request, res: Response): void => {
  const { text } = req.body;
  const scriptPath = path.join(__dirname, '../../../scripts/process_symptoms.py');

  // Set the PYTHONIOENCODING environment variable to utf-8
  const command = `set PYTHONIOENCODING=utf-8 && python "${scriptPath}" "${text}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    //console.log(stdout);
    const result = JSON.parse(stdout);
    res.json(result);
  });
};