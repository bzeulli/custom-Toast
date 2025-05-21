/**
 * @description       : 
 * @author            : Michele Rosa
 * @group             : 
 * @last modified on  : 20-05-2025
 * @last modified by  : Michele Rosa
**/
public with sharing class AccountService {
    @AuraEnabled
    public static void createAccount(String nome) {
        if (String.isBlank(nome)) {
            throw new AuraHandledException('O nome da conta não pode estar vazio.');
        }

        Account acc = new Account(Name = nome);
        insert acc;
    }
}