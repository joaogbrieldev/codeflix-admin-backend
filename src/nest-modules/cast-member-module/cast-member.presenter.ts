import { Transform } from 'class-transformer';
import { CastMemberOutput } from 'src/core/data/use-cases/cast-member/create-cast-member/common/cast-member-output';
import { ListCastMembersOutput } from 'src/core/domain/contracts/use-cases/cast-member/list-cast-members';
import { CastMemberTypeEnum } from 'src/core/domain/types/cast-member.types';
import { CollectionPresenter } from '../shared-module/collection.presenter';

export class CastMemberPresenter {
  id: string;
  name: string;
  type: CastMemberTypeEnum;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;

  constructor(output: CastMemberOutput) {
    this.id = output.id;
    this.name = output.name;
    this.type = output.type;
    this.created_at = output.created_at;
  }
}

export class CastMemberCollectionPresenter extends CollectionPresenter {
  data: CastMemberPresenter[];

  constructor(output: ListCastMembersOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((i) => new CastMemberPresenter(i));
  }
}
