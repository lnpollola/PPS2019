/**
 * Ionic4 Firebase Starter Kit (https://store.enappd.com/product/firebase-starter-kitionic4-firebase-starter)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseDataService } from "./base-data.service";
import{FAQDto} from '../../models/faq.model';
import { FirestoreService } from "../firestore/firestore.service";
import { utilService } from '../util/util.service';


@Injectable()
export class FAQDataService extends BaseDataService<FAQDto> {
    constructor(private firestore: FirestoreService, private util: utilService) {
        super('faq');
    }

    public get(): Observable<FAQDto[]> {
        return this.firestore.get<FAQDto>(this.baseCollection);
    }

    public getOne(id: string): Observable<FAQDto> {
        return this.firestore.getOne<FAQDto>(this.baseCollection, id);
    }

    public update(data: Partial<FAQDto>): Promise<void> {
        return this.firestore.update<FAQDto>(this.baseCollection, data.id, data);
    }

    public delete(id: string): Promise<any> {
        return this.firestore.delete(this.baseCollection, id);
    }
    
    public create(data: FAQDto): Promise<void> {
        return this.firestore.create(this.baseCollection, data);
    }
}