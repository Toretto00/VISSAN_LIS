IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [Categories] (
        [id] int NOT NULL IDENTITY,
        [name] nvarchar(max) NULL,
        [code] nvarchar(max) NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [StoreLocations] (
        [id] nvarchar(450) NOT NULL,
        [warehouseID] nvarchar(max) NULL,
        [storeID] nvarchar(max) NULL,
        [name] nvarchar(max) NULL,
        [retailName] nvarchar(max) NULL,
        [retailSystem] nvarchar(max) NULL,
        [shortname] nvarchar(max) NULL,
        CONSTRAINT [PK_StoreLocations] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [Users] (
        [id] int NOT NULL IDENTITY,
        [username] nvarchar(max) NULL,
        [password] nvarchar(max) NULL,
        [role] nvarchar(max) NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [Products] (
        [id] int NOT NULL IDENTITY,
        [categoryid] int NULL,
        [name] nvarchar(max) NULL,
        [code] nvarchar(max) NULL,
        [description] nvarchar(max) NULL,
        [created] nvarchar(max) NULL,
        [updated] nvarchar(max) NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([id]),
        CONSTRAINT [FK_Products_Categories_categoryid] FOREIGN KEY ([categoryid]) REFERENCES [Categories] ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [Invoices] (
        [Id] int NOT NULL IDENTITY,
        [date] nvarchar(max) NULL,
        [status] nvarchar(max) NULL,
        [userid] int NULL,
        [created] nvarchar(max) NULL,
        [updated] nvarchar(max) NULL,
        CONSTRAINT [PK_Invoices] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Invoices_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [User_Locations] (
        [Id] int NOT NULL IDENTITY,
        [userid] int NULL,
        [storeLocationid] nvarchar(450) NULL,
        [created] nvarchar(max) NULL,
        [updated] nvarchar(max) NULL,
        CONSTRAINT [PK_User_Locations] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_User_Locations_StoreLocations_storeLocationid] FOREIGN KEY ([storeLocationid]) REFERENCES [StoreLocations] ([id]),
        CONSTRAINT [FK_User_Locations_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [Inventories] (
        [Id] int NOT NULL IDENTITY,
        [locationid] nvarchar(450) NULL,
        [productid] int NULL,
        [quantity] int NOT NULL,
        [created] nvarchar(max) NULL,
        [updated] nvarchar(max) NULL,
        CONSTRAINT [PK_Inventories] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Inventories_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id]),
        CONSTRAINT [FK_Inventories_StoreLocations_locationid] FOREIGN KEY ([locationid]) REFERENCES [StoreLocations] ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE TABLE [Invoice_Products] (
        [Id] int NOT NULL IDENTITY,
        [userid] int NULL,
        [invoiceId] int NULL,
        [quantity] int NOT NULL,
        [created] nvarchar(max) NULL,
        [updated] nvarchar(max) NULL,
        CONSTRAINT [PK_Invoice_Products] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Invoice_Products_Invoices_invoiceId] FOREIGN KEY ([invoiceId]) REFERENCES [Invoices] ([Id]),
        CONSTRAINT [FK_Invoice_Products_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_Inventories_locationid] ON [Inventories] ([locationid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_Inventories_productid] ON [Inventories] ([productid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_Invoice_Products_invoiceId] ON [Invoice_Products] ([invoiceId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_Invoice_Products_userid] ON [Invoice_Products] ([userid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_Invoices_userid] ON [Invoices] ([userid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_Products_categoryid] ON [Products] ([categoryid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_User_Locations_storeLocationid] ON [User_Locations] ([storeLocationid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    CREATE INDEX [IX_User_Locations_userid] ON [User_Locations] ([userid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240612035506_init'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240612035506_init', N'8.0.6');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240613012942_update-invoice-product'
)
BEGIN
    ALTER TABLE [Invoice_Products] DROP CONSTRAINT [FK_Invoice_Products_Users_userid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240613012942_update-invoice-product'
)
BEGIN
    EXEC sp_rename N'[Invoice_Products].[userid]', N'productid', N'COLUMN';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240613012942_update-invoice-product'
)
BEGIN
    EXEC sp_rename N'[Invoice_Products].[IX_Invoice_Products_userid]', N'IX_Invoice_Products_productid', N'INDEX';
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240613012942_update-invoice-product'
)
BEGIN
    ALTER TABLE [Invoice_Products] ADD CONSTRAINT [FK_Invoice_Products_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240613012942_update-invoice-product'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240613012942_update-invoice-product', N'8.0.6');
END;
GO

COMMIT;
GO

