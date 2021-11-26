import {
  Address,
  Amounts,
  Country,
  CreditCardData,
  Instrument,
  Instruments,
  InstrumentStatus,
  Payer,
  ShopperInteraction,
} from '../types';
import { getInstruments } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getInstruments.fixtures';
import moxios from 'moxios';

describe('getInstruments', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const country: Country = {
      alpha2Code: 'string',
      alpha3Code: 'string',
      culture: 'string',
      id: 0,
      name: 'string',
      nativeName: 'string',
      region: 'string',
      subRegion: 'string',
      regionId: 0,
      subfolder: 'string',
      continentId: 0,
    };
    const address: Address = {
      addressLine1: 'string',
      addressLine2: 'string',
      addressLine3: 'string',
      vatNumber: 'string',
      zipCode: 'string',
      phone: 'string',
      neighbourhood: 'string',
      ddd: 'string',
      city: {
        countryId: 0,
        id: 0,
        name: 'string',
        stateId: 0,
      },
      state: {
        code: 'string',
        countryId: 0,
        id: 0,
        name: 'string',
      },
      country,
      continent: {
        id: 0,
        name: 'string',
        countries: [country],
      },
    };
    const payer: Payer = {
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      address: address,
    };
    const amounts: Amounts = {
      value: 0,
      settledValue: 0,
      refundedValue: 0,
    };
    const ccData: CreditCardData = {
      cardHolderName: 'string',
      cardNumber: 'string',
      cardExpiryMonth: 0,
      cardExpiryYear: 0,
      cardCvv: 'string',
      giftCardNumber: 'string',
      giftCardCsc: 'string',
      creditUserId: 'string',
    };
    const instrument: Instrument = {
      id: '00000000-0000-0000-0000-000000000000',
      method: 'string',
      option: 'string',
      amounts: [amounts, amounts],
      status: InstrumentStatus.Created,
      payer: payer,
      data: ccData,
      installments: {
        quantity: 0,
      },
      shopperInteraction: ShopperInteraction.Ecommerce,
    };

    const response: Instruments = [instrument, instrument];

    fixtures.success({ id, response });

    expect.assertions(2);
    await expect(getInstruments(id)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(getInstruments(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});