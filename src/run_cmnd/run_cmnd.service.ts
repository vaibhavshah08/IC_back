import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class RunCmndService {
    executeCommands(initialLocation: string, commands: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
          const commandString = commands.join(' && ');
          const cmd = spawn('cmd.exe', ['/c', commandString], {
            cwd: initialLocation,
            shell: true,
            stdio: 'inherit', // Share the stdio with the parent process (terminal)
          });
    
          cmd.on('error', (error) => {
            reject(error.message);
          });
    
          cmd.on('close', (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(`Command failed with code ${code}`);
            }
          });
        });
      }
}
