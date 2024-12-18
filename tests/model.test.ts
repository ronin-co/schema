import { describe, expect, test } from 'bun:test';
import { blob, boolean, date, json, link, model, number, string } from '@/src/index';
import { add } from 'ronin';

const default_FIELD_PROPERTIES = {
  required: false,
  unique: false,
};

describe('models', () => {
  test('create empty model', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
    });

    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      // @ts-expect-error: The Account object has 'pluralSlug'.
      pluralSlug: 'accounts',
      // @ts-expect-error: The Account object has 'fields'.
      fields: [],
    });
  });

  test('create empty model with name', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      // @ts-expect-error: The Account object has 'pluralSlug'.
      pluralSlug: 'accounts',
      // @ts-expect-error: The Account object has 'name'.
      name: 'Account',
      // @ts-expect-error: The Account object has 'fields'.
      fields: [],
    });
  });

  test('create empty model with plural name', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      pluralName: 'Accounts',
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      // @ts-expect-error: The Account object has 'pluralSlug'.
      pluralSlug: 'accounts',
      // @ts-expect-error: The Account object has 'name'.
      name: 'Account',
      // @ts-expect-error: The Account object has 'pluralName'.
      pluralName: 'Accounts',
      // @ts-expect-error: The Account object has 'fields'.
      fields: [],
    });
  });

  test('create empty model without plural slug', () => {
    const Account = model({
      slug: 'account',
      name: 'Account',
      fields: {},
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      name: 'Account',
      fields: [],
    });
  });

  test('create empty model with name and plural name', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      pluralName: 'Accounts',
      fields: {},
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      pluralName: 'Accounts',
      fields: [],
    });
  });

  test('create empty model with identifier', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      identifiers: {
        name: 'Account',
        slug: 'account',
      },
      fields: {},
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      identifiers: {
        name: 'Account',
        slug: 'account',
      },
      fields: [],
    });
  });

  test('create empty model with id prefix', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      idPrefix: 'acc_',
      fields: {},
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      idPrefix: 'acc_',
      fields: [],
    });
  });

  test('create simple model', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true }),
      },
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
      ],
    });
  });

  test('create simple model with blob field', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true }),
        avatar: blob(),
      },
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'avatar',
          type: 'blob',
        },
      ],
    });
  });

  test('create simple model with json field', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true }),
        bio: json(),
      },
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'bio',
          type: 'json',
        },
      ],
    });
  });

  test('create simple model with date field', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true }),
        birthday: date(),
      },
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'birthday',
          type: 'date',
        },
      ],
    });
  });

  test('create simple model with custom field name', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true, name: 'CusToM NaMe' }),
      },
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          name: 'CusToM NaMe',
          type: 'string',
          required: true,
        },
      ],
    });
  });

  test('create simple model with field name inferred from slug', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        createdAt: string({ required: true }),
      },
    });
    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'createdAt',
          type: 'string',
          required: true,
        },
      ],
    });
  });

  test('create model with multiple fields', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true }),
        email: string(),
        emailVerified: boolean(),
        password: string(),
        follower: number(),
      },
    });

    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'email',
          type: 'string',
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'emailVerified',
          type: 'boolean',
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'password',
          type: 'string',
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'follower',
          type: 'number',
        },
      ],
    });
  });

  test('create model with unique field', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ unique: true }),
      },
    });

    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          unique: true,
        },
      ],
    });
  });

  test('create model with link field', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',

      fields: {
        name: string({ required: true }),
      },
    });

    const Post = model({
      slug: 'post',
      pluralSlug: 'posts',

      fields: {
        author: link({
          model: Account,
          actions: {
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
        }),
      },
    });

    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
      ],
    });

    expect(Post).toBeTypeOf('object');

    expect(Post).toEqual({
      // @ts-expect-error: The Post object has 'slug'.
      slug: 'post',
      pluralSlug: 'posts',

      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'author',
          type: 'link',
          target: 'account',
          actions: {
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
        },
      ],
    });
  });

  test('create model with index', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      fields: {
        name: string({ required: true }),
      },
      indexes: [
        {
          fields: [{ slug: 'name', order: 'ASC', collation: 'BINARY' }],
        },
      ],
    });
    expect(Account).toBeTypeOf('object');
    // @ts-expect-error: The Account object has 'fields'.
    expect(Account.fields).toHaveLength(1);

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
      ],
      indexes: [
        {
          fields: [{ slug: 'name', order: 'ASC', collation: 'BINARY' }],
        },
      ],
    });
  });

  test('create model with invalid index field', () => {
    try {
      model({
        slug: 'account',
        pluralSlug: 'accounts',
        name: 'Account',
        fields: {
          name: string({ required: true }),
        },
        indexes: [
          {
            fields: [
              // @ts-expect-error This is intended.
              { slug: 'thisFieldDoesNotExist', order: 'ASC', collation: 'BINARY' },
            ],
          },
        ],
      });
    } catch (err) {
      const error = err as Error;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        'The field thisFieldDoesNotExist does not exist in this model.',
      );
    }
  });

  test('create model with empty index field', () => {
    try {
      model({
        slug: 'account',
        pluralSlug: 'accounts',
        name: 'Account',
        fields: {
          name: string({ required: true }),
        },
        indexes: [
          {
            fields: [],
          },
        ],
      });
    } catch (err) {
      const error = err as Error;
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('An index must have at least one field.');
    }
  });

  test('create model with triggers', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      fields: {
        name: string({ required: true }),
      },
      triggers: [
        {
          action: 'INSERT',
          when: 'AFTER',
          fields: [{ slug: 'name' }],
          // @ts-expect-error: The queries need to be adjusted in the TS client.
          effects: () => [add.account.to({ name: 'Lorena' })],
        },
      ],
    });
    expect(Account).toBeTypeOf('object');
    // @ts-expect-error: The Account object has 'fields'.
    expect(Account.fields).toHaveLength(1);

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      name: 'Account',
      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'name',
          type: 'string',
          required: true,
        },
      ],
      triggers: [
        {
          action: 'INSERT',
          when: 'AFTER',
          effects: [
            {
              add: {
                account: {
                  to: {
                    name: 'Lorena',
                  },
                },
              },
            },
          ],
          fields: [{ slug: 'name' }],
        },
      ],
    });
  });

  test('create model with nested fields', () => {
    const Account = model({
      slug: 'account',
      pluralSlug: 'accounts',
      fields: {
        address: {
          country: string({ required: true }),
          city: string(),
        },
      },
    });

    expect(Account).toBeTypeOf('object');

    expect(Account).toEqual({
      // @ts-expect-error: The Account object has 'slug'.
      slug: 'account',
      pluralSlug: 'accounts',
      fields: [
        {
          ...default_FIELD_PROPERTIES,
          slug: 'address.country',
          type: 'string',
          required: true,
        },
        {
          ...default_FIELD_PROPERTIES,
          slug: 'address.city',
          type: 'string',
        },
      ],
    });
  });
});
