/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // If authorization header exists
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token) {
      // In demo mode or Supabase token decoding
      if (token === 'demo-token' || token.startsWith('demo-')) {
        req.user = {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'aria.chen@djsce.edu.in',
        };
        return next();
      }

      // If token is a user ID directly (e.g. from local session)
      if (token.length > 5) {
        req.user = {
          id: token.startsWith('user_') ? token : token,
          email: 'student@djsce.edu.in',
        };
        return next();
      }
    }
  }

  // Default fallback to Demo User for seamless offline and presentation testing
  req.user = {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'aria.chen@djsce.edu.in',
  };
  return next();
}
