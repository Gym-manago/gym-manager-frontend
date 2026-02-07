import { fetchApi } from '~/utils/fetchApi';
import { Member, MemberBase } from './types';

export const getAllMembers = async () => {
  const members = await fetchApi<MemberBase[]>('/members/get-all', {
    method: 'GET',
  });
  return members;
};

export const addNewMember = async (payload: {
  member: Omit<MemberBase, 'age'>;
  address: Member['address'];
}) => {
  const newMember = await fetchApi<MemberBase>('/members/add', {
    method: 'POST',
    body: payload,
  });
  return newMember;
};

export const getMemberById = async (id: string) => {
  const member = await fetchApi<{
    member: Omit<MemberBase, 'age'>;
    address: Member['address'];
  }>(`/members/${id}`, {
    method: 'GET',
  });
  return member;
};
