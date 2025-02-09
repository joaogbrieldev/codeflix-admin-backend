import { CastMember } from 'src/core/domain/entities/cast-member.entity';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';

describe('CastMemberEntity', () => {
  test('Should be create a new CastMember', () => {
    const CastMemberCreated: CastMember = new CastMember({
      name: 'Dr Enéias Brabissimo',
      type: CastMemberTypeEnum.actor,
    });
    const CastMemberMethod = CastMember.create(CastMemberCreated);
    expect(CastMemberMethod).toStrictEqual(CastMemberCreated);
  });

  test('Should be get entity Id', () => {
    const castMember: CastMember = new CastMember({
      name: 'Dr Enéias Brabissimo',
      type: CastMemberTypeEnum.actor,
    });

    expect(castMember.entity_id).toStrictEqual(castMember.castMemberId);
  });

  test('Should be changeName', () => {
    const castMember: CastMember = CastMember.create({
      name: 'Dr Enéias Brabissimo',
      type: CastMemberTypeEnum.actor,
    });
    castMember.changeName('Terror');
    expect(castMember.name).toStrictEqual('Terror');
  });

  test('Should be return JSON Format', () => {
    const castMember: CastMember = new CastMember({
      name: 'Dr Enéias Brabissimo',
      type: CastMemberTypeEnum.actor,
    });
    expect(castMember.toJSON()).toStrictEqual({
      castMemberId: castMember.castMemberId.id,
      name: 'Dr Enéias Brabissimo',
      type: CastMemberTypeEnum.actor,
      created_at: castMember.created_at,
    });
  });
});
