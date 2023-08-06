import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
  studentId: string;
}

const MS_PER_HOUR = 60 * 60 * 1000;

export function StudentDetail({ studentId }: StudentDetailProps) {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
    dedupingInterval: MS_PER_HOUR,
  });

  function mutateClick() {
    mutate({ name: 'Quyyy' }, true);
  }
  return (
    <div>
      Name:{data?.name || '--'}
      <button onClick={mutateClick}>mutate</button>
    </div>
  );
}
