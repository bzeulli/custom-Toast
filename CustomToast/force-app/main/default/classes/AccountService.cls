/**
 * @description       : 
 * @author            : Michele Rosa
 * @group             : 
 * @last modified on  : 05-08-2025
 * @last modified by  : Michele Rosa
**/
public with sharing class AccountService {
    @AuraEnabled
    public static void createAccount(String name) {
        if (String.isBlank(name)) {
            throw new AuraHandledException('Account name cannot be empty.');
        }

        Account acc = new Account(Name = name);
        Database.insert(acc);
    }

    @AuraEnabled
    public static void createAccountList(String nameBase, Integer quantity) {
        if (String.isBlank(nameBase) || quantity == null || quantity <= 0) {
            throw new AuraHandledException('Name base and quantity must be provided.');
        }
        List<Account> accList = new List<Account>();
        for (Integer i = 1; i <= quantity; i++) {
            accList.add(new Account(Name = nameBase + ' ' + i));
        }
        Database.insert(accList);
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountByName(String name) {
        if (String.isBlank(name)) {
            throw new AuraHandledException('Account name cannot be empty.');
        }
        List<Account> accList = [SELECT Id, Name FROM Account WHERE Name = :name];
        if (accList.isEmpty()) {
            throw new AuraHandledException('No accounts found with the name: ' + name);
        }
        return accList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountByIds(List<String> accountIds) {
        if (accountIds.isEmpty()) {
            throw new AuraHandledException('Account Id cannot be empty.');
        }
        List<Account> accList = [SELECT Id, Name FROM Account WHERE Id = :accountIds];
        if (accList.isEmpty()) {
            throw new AuraHandledException('No accounts found with the ids: ' + accountIds);
        }
        return accList;
    }

    @AuraEnabled(cacheable=true)
    public static Account getOneAccountByName(String name) {
        if (String.isBlank(name)) {
            throw new AuraHandledException('Account name cannot be empty.');
        }
        List<Account> accList = [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1];
        if (accList[0] == null || accList.isEmpty()) {
            throw new AuraHandledException('No accounts found with the name: ' + name);
        }
        return accList[0];
    }

    @AuraEnabled(cacheable=true)
    public static Account getOneAccountById(String accountId) {
        if (String.isBlank(accountId)) {
            throw new AuraHandledException('Account Id cannot be empty.');
        }
        List<Account> accList = [SELECT Id, Name FROM Account WHERE Id = :accountId LIMIT 1];
        if (accList[0] == null || accList.isEmpty()) {
            throw new AuraHandledException('No accounts found with the ids: ' + accountId);
        }
        return accList[0];
    }

    @AuraEnabled
    public static void deleteAccountById(Id accountId) {
        if (accountId == null) {
            throw new AuraHandledException('Account Id cannot be null.');
        }
        Account acc = getOneAccountById(accountId);
        Database.delete(acc);
    }

    @AuraEnabled
    public static void deleteAccountList(List<String> accountIds) {
        if (accountIds == null || accountIds.isEmpty()) {
            throw new AuraHandledException('Account Id list cannot be empty.');
        }
        List<Account> accList = getAccountByIds(accountIds);
        if (!accList.isEmpty()) {
            Database.delete(accList);
        }
    }

    @AuraEnabled
    public static void deleteAccountByName(String name) {
        if (String.isBlank(name)) {
            throw new AuraHandledException('Account name cannot be empty.');
        }
        List<Account> accList = getAccountByName(name);
        if (!accList.isEmpty()) {
            Database.delete(accList);
        }
    }
}