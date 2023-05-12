import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyUser } from 'src/entity/CompanyUser.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyUser)
        private companyRepository: Repository<CompanyUser>,
        ) {}

    async findAll(): Promise<CompanyUser[]> {
        return this.companyRepository.find();
    }

    async findOne(email: string): Promise<CompanyUser | undefined> {
        return this.companyRepository.findOne({where: {email}});
    }

}
