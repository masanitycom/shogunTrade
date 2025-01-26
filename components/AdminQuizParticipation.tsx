import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface QuizParticipation {
  userId: string;
  userName: string;
  weekNumber: number;
  participatedAt: Date;
}

interface AdminQuizParticipationProps {
  participations: QuizParticipation[];
}

export function AdminQuizParticipation({ participations }: AdminQuizParticipationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>クイズ参加状況</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ユーザーID</TableHead>
              <TableHead>ユーザー名</TableHead>
              <TableHead>週番号</TableHead>
              <TableHead>参加日時</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participations.map((participation, index) => (
              <TableRow key={index}>
                <TableCell>{participation.userId}</TableCell>
                <TableCell>{participation.userName}</TableCell>
                <TableCell>{participation.weekNumber}</TableCell>
                <TableCell>{participation.participatedAt.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

