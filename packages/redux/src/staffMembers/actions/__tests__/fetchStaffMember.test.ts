import { actionTypes } from '../../';
import { fetchStaffMember } from '../';
import { getStaffMember } from '@farfetch/blackout-client/staffMembers';
import { INITIAL_STATE } from '../../reducer';
import {
  mockStaffMember,
  mockStaffMemberId,
  mockState,
} from 'tests/__fixtures__/staffMembers';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client/staffMembers', () => ({
  ...jest.requireActual('@farfetch/blackout-client/staffMembers'),
  getStaffMember: jest.fn(),
}));

let store;
const expectedConfig = undefined;
const staffMembersMockStore = (state = {}) =>
  mockStore({ staffMembers: INITIAL_STATE }, state);

describe('fetchStaffMember() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = staffMembersMockStore(mockState);
  });

  it('should create the correct actions for when the fetch staff member fail', async () => {
    const expectedError = new Error('fetch staff member error');

    getStaffMember.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchStaffMember(mockStaffMemberId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getStaffMember).toHaveBeenCalledTimes(1);
      expect(getStaffMember).toHaveBeenCalledWith(
        mockStaffMemberId,
        expectedConfig,
      );
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
          meta: { id: mockStaffMemberId },
        },
        {
          type: actionTypes.FETCH_STAFF_MEMBER_FAILURE,
          payload: { error: expectedError },
          meta: { id: mockStaffMemberId },
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch staff member procedure is successful', async () => {
    getStaffMember.mockResolvedValueOnce(mockStaffMember);

    expect.assertions(4);

    await store
      .dispatch(fetchStaffMember(mockStaffMemberId, expectedConfig))
      .then(clientResult => {
        expect(clientResult).toBe(mockStaffMember);
      });

    expect(getStaffMember).toHaveBeenCalledTimes(1);
    expect(getStaffMember).toHaveBeenCalledWith(
      mockStaffMemberId,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_STAFF_MEMBER_REQUEST,
        meta: { id: mockStaffMemberId },
      },
      {
        type: actionTypes.FETCH_STAFF_MEMBER_SUCCESS,
        payload: { result: mockStaffMember },
        meta: { id: mockStaffMemberId },
      },
    ]);
  });
});