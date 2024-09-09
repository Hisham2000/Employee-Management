import { Injectable, LoggerService } from "@nestjs/common";
import { logger } from "./logger";
import * as stackTrace from 'stack-trace';

@Injectable()
export class CustomLogger implements LoggerService {

  private getCallerDetails() {
    const trace = stackTrace.get();
    const caller = trace[0] || null;
    if(caller && Object.keys(caller).length > 0){
     return {
      functionName: caller.getFunctionName(),
      fileName: caller.getFileName(),
      lineNumber: caller.getLineNumber(),
      className: trace[5].getFileName().split('/').pop()?.replace('.js', ''),
     }
    }else{
      return  {
        functionName: 'Initial call',
        fileName: 'Initial call',
        lineNumber: 'Initial call',
        className: 'Initial Call'
      };
    }
  }

  private formatMessage(message: string, context?: string, customFunctionName?: string, customLineNumber?: string): string {
    const { functionName, className, lineNumber } = this.getCallerDetails();
    return `[${context || className}] [Line ==> ${customLineNumber || lineNumber}] ${message} - function => ${customFunctionName || functionName }`;
  }

  log(message: string, context?: string) {
    logger.info(this.formatMessage(message, context));
  }

  error(message: string, context?: string, functionName?: string, lineNumber?: string) {
    logger.error(this.formatMessage(message, context, functionName, lineNumber));
  }

  warn(message: string, context?: string) {
    logger.warn(`${context ? `[${context}] ` : ''}${message}`);
  }

  debug(message: string, context?: string) {
    logger.debug(`${context ? `[${context}] ` : ''}${message}`);
  }

  verbose(message: string, context?: string) {
    logger.verbose(`${context ? `[${context}] ` : ''}${message}`);
  }
}
