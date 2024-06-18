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
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [Categories] (
        [id] int NOT NULL IDENTITY,
        [name] nvarchar(max) NOT NULL,
        [code] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Categories] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [StoreLocation] (
        [id] int NOT NULL IDENTITY,
        [warehouseid] nvarchar(max) NOT NULL,
        [storeid] nvarchar(max) NOT NULL,
        [retailname] nvarchar(max) NOT NULL,
        [retailsystem] nvarchar(max) NOT NULL,
        [shortname] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_StoreLocation] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [Users] (
        [id] int NOT NULL IDENTITY,
        [username] nvarchar(max) NOT NULL,
        [password] nvarchar(max) NOT NULL,
        [role] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [Products] (
        [id] int NOT NULL IDENTITY,
        [categoryid] int NOT NULL,
        [name] nvarchar(max) NOT NULL,
        [code] nvarchar(max) NOT NULL,
        [description] nvarchar(max) NOT NULL,
        [created] nvarchar(max) NOT NULL,
        [updated] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([id]),
        CONSTRAINT [FK_Products_Categories_categoryid] FOREIGN KEY ([categoryid]) REFERENCES [Categories] ([id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [Invoices] (
        [Id] int NOT NULL IDENTITY,
        [date] nvarchar(max) NOT NULL,
        [status] nvarchar(max) NOT NULL,
        [userid] int NOT NULL,
        [created] nvarchar(max) NOT NULL,
        [updated] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Invoices] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Invoices_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [User_Locations] (
        [Id] int NOT NULL IDENTITY,
        [userid] int NOT NULL,
        [storeLocationid] int NOT NULL,
        [created] nvarchar(max) NOT NULL,
        [updated] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_User_Locations] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_User_Locations_StoreLocation_storeLocationid] FOREIGN KEY ([storeLocationid]) REFERENCES [StoreLocation] ([id]) ON DELETE CASCADE,
        CONSTRAINT [FK_User_Locations_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [Inventories] (
        [Id] int NOT NULL IDENTITY,
        [locationid] int NOT NULL,
        [productid] int NOT NULL,
        [quantity] int NOT NULL,
        [created] nvarchar(max) NOT NULL,
        [updated] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Inventories] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Inventories_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Inventories_StoreLocation_locationid] FOREIGN KEY ([locationid]) REFERENCES [StoreLocation] ([id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE TABLE [Invoice_Products] (
        [Id] int NOT NULL IDENTITY,
        [productid] int NOT NULL,
        [invoiceId] int NOT NULL,
        [quantity] int NOT NULL,
        [created] nvarchar(max) NOT NULL,
        [updated] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Invoice_Products] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Invoice_Products_Invoices_invoiceId] FOREIGN KEY ([invoiceId]) REFERENCES [Invoices] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Invoice_Products_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_Inventories_locationid] ON [Inventories] ([locationid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_Inventories_productid] ON [Inventories] ([productid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_Invoice_Products_invoiceId] ON [Invoice_Products] ([invoiceId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_Invoice_Products_productid] ON [Invoice_Products] ([productid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_Invoices_userid] ON [Invoices] ([userid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_Products_categoryid] ON [Products] ([categoryid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_User_Locations_storeLocationid] ON [User_Locations] ([storeLocationid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    CREATE INDEX [IX_User_Locations_userid] ON [User_Locations] ([userid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618042520_init'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240618042520_init', N'8.0.6');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Inventories] DROP CONSTRAINT [FK_Inventories_Products_productid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Inventories] DROP CONSTRAINT [FK_Inventories_StoreLocation_locationid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Invoice_Products] DROP CONSTRAINT [FK_Invoice_Products_Invoices_invoiceId];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Invoice_Products] DROP CONSTRAINT [FK_Invoice_Products_Products_productid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Invoices] DROP CONSTRAINT [FK_Invoices_Users_userid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Products] DROP CONSTRAINT [FK_Products_Categories_categoryid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [User_Locations] DROP CONSTRAINT [FK_User_Locations_StoreLocation_storeLocationid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [User_Locations] DROP CONSTRAINT [FK_User_Locations_Users_userid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'username');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Users] ALTER COLUMN [username] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'role');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Users] ALTER COLUMN [role] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'password');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [Users] ALTER COLUMN [password] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[User_Locations]') AND [c].[name] = N'userid');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [User_Locations] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [User_Locations] ALTER COLUMN [userid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[User_Locations]') AND [c].[name] = N'updated');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [User_Locations] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [User_Locations] ALTER COLUMN [updated] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[User_Locations]') AND [c].[name] = N'storeLocationid');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [User_Locations] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [User_Locations] ALTER COLUMN [storeLocationid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[User_Locations]') AND [c].[name] = N'created');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [User_Locations] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [User_Locations] ALTER COLUMN [created] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var7 sysname;
    SELECT @var7 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[StoreLocation]') AND [c].[name] = N'warehouseid');
    IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [StoreLocation] DROP CONSTRAINT [' + @var7 + '];');
    ALTER TABLE [StoreLocation] ALTER COLUMN [warehouseid] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var8 sysname;
    SELECT @var8 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[StoreLocation]') AND [c].[name] = N'storeid');
    IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [StoreLocation] DROP CONSTRAINT [' + @var8 + '];');
    ALTER TABLE [StoreLocation] ALTER COLUMN [storeid] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var9 sysname;
    SELECT @var9 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[StoreLocation]') AND [c].[name] = N'shortname');
    IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [StoreLocation] DROP CONSTRAINT [' + @var9 + '];');
    ALTER TABLE [StoreLocation] ALTER COLUMN [shortname] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var10 sysname;
    SELECT @var10 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[StoreLocation]') AND [c].[name] = N'retailsystem');
    IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [StoreLocation] DROP CONSTRAINT [' + @var10 + '];');
    ALTER TABLE [StoreLocation] ALTER COLUMN [retailsystem] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var11 sysname;
    SELECT @var11 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[StoreLocation]') AND [c].[name] = N'retailname');
    IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [StoreLocation] DROP CONSTRAINT [' + @var11 + '];');
    ALTER TABLE [StoreLocation] ALTER COLUMN [retailname] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var12 sysname;
    SELECT @var12 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'updated');
    IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var12 + '];');
    ALTER TABLE [Products] ALTER COLUMN [updated] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var13 sysname;
    SELECT @var13 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'name');
    IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var13 + '];');
    ALTER TABLE [Products] ALTER COLUMN [name] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var14 sysname;
    SELECT @var14 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'description');
    IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var14 + '];');
    ALTER TABLE [Products] ALTER COLUMN [description] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var15 sysname;
    SELECT @var15 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'created');
    IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var15 + '];');
    ALTER TABLE [Products] ALTER COLUMN [created] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var16 sysname;
    SELECT @var16 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'code');
    IF @var16 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var16 + '];');
    ALTER TABLE [Products] ALTER COLUMN [code] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var17 sysname;
    SELECT @var17 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'categoryid');
    IF @var17 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var17 + '];');
    ALTER TABLE [Products] ALTER COLUMN [categoryid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var18 sysname;
    SELECT @var18 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'userid');
    IF @var18 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var18 + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [userid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var19 sysname;
    SELECT @var19 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'updated');
    IF @var19 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var19 + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [updated] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var20 sysname;
    SELECT @var20 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'status');
    IF @var20 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var20 + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [status] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var21 sysname;
    SELECT @var21 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'date');
    IF @var21 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var21 + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [date] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var22 sysname;
    SELECT @var22 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'created');
    IF @var22 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var22 + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [created] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var23 sysname;
    SELECT @var23 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoice_Products]') AND [c].[name] = N'updated');
    IF @var23 IS NOT NULL EXEC(N'ALTER TABLE [Invoice_Products] DROP CONSTRAINT [' + @var23 + '];');
    ALTER TABLE [Invoice_Products] ALTER COLUMN [updated] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var24 sysname;
    SELECT @var24 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoice_Products]') AND [c].[name] = N'productid');
    IF @var24 IS NOT NULL EXEC(N'ALTER TABLE [Invoice_Products] DROP CONSTRAINT [' + @var24 + '];');
    ALTER TABLE [Invoice_Products] ALTER COLUMN [productid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var25 sysname;
    SELECT @var25 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoice_Products]') AND [c].[name] = N'invoiceId');
    IF @var25 IS NOT NULL EXEC(N'ALTER TABLE [Invoice_Products] DROP CONSTRAINT [' + @var25 + '];');
    ALTER TABLE [Invoice_Products] ALTER COLUMN [invoiceId] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var26 sysname;
    SELECT @var26 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoice_Products]') AND [c].[name] = N'created');
    IF @var26 IS NOT NULL EXEC(N'ALTER TABLE [Invoice_Products] DROP CONSTRAINT [' + @var26 + '];');
    ALTER TABLE [Invoice_Products] ALTER COLUMN [created] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var27 sysname;
    SELECT @var27 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Inventories]') AND [c].[name] = N'updated');
    IF @var27 IS NOT NULL EXEC(N'ALTER TABLE [Inventories] DROP CONSTRAINT [' + @var27 + '];');
    ALTER TABLE [Inventories] ALTER COLUMN [updated] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var28 sysname;
    SELECT @var28 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Inventories]') AND [c].[name] = N'productid');
    IF @var28 IS NOT NULL EXEC(N'ALTER TABLE [Inventories] DROP CONSTRAINT [' + @var28 + '];');
    ALTER TABLE [Inventories] ALTER COLUMN [productid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var29 sysname;
    SELECT @var29 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Inventories]') AND [c].[name] = N'locationid');
    IF @var29 IS NOT NULL EXEC(N'ALTER TABLE [Inventories] DROP CONSTRAINT [' + @var29 + '];');
    ALTER TABLE [Inventories] ALTER COLUMN [locationid] int NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var30 sysname;
    SELECT @var30 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Inventories]') AND [c].[name] = N'created');
    IF @var30 IS NOT NULL EXEC(N'ALTER TABLE [Inventories] DROP CONSTRAINT [' + @var30 + '];');
    ALTER TABLE [Inventories] ALTER COLUMN [created] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var31 sysname;
    SELECT @var31 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Categories]') AND [c].[name] = N'name');
    IF @var31 IS NOT NULL EXEC(N'ALTER TABLE [Categories] DROP CONSTRAINT [' + @var31 + '];');
    ALTER TABLE [Categories] ALTER COLUMN [name] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    DECLARE @var32 sysname;
    SELECT @var32 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Categories]') AND [c].[name] = N'code');
    IF @var32 IS NOT NULL EXEC(N'ALTER TABLE [Categories] DROP CONSTRAINT [' + @var32 + '];');
    ALTER TABLE [Categories] ALTER COLUMN [code] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Inventories] ADD CONSTRAINT [FK_Inventories_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Inventories] ADD CONSTRAINT [FK_Inventories_StoreLocation_locationid] FOREIGN KEY ([locationid]) REFERENCES [StoreLocation] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Invoice_Products] ADD CONSTRAINT [FK_Invoice_Products_Invoices_invoiceId] FOREIGN KEY ([invoiceId]) REFERENCES [Invoices] ([Id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Invoice_Products] ADD CONSTRAINT [FK_Invoice_Products_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Invoices] ADD CONSTRAINT [FK_Invoices_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [Products] ADD CONSTRAINT [FK_Products_Categories_categoryid] FOREIGN KEY ([categoryid]) REFERENCES [Categories] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [User_Locations] ADD CONSTRAINT [FK_User_Locations_StoreLocation_storeLocationid] FOREIGN KEY ([storeLocationid]) REFERENCES [StoreLocation] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    ALTER TABLE [User_Locations] ADD CONSTRAINT [FK_User_Locations_Users_userid] FOREIGN KEY ([userid]) REFERENCES [Users] ([id]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618045456_update-nullable'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240618045456_update-nullable', N'8.0.6');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618143845_update-inventory'
)
BEGIN
    ALTER TABLE [Inventories] DROP CONSTRAINT [FK_Inventories_Products_productid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618143845_update-inventory'
)
BEGIN
    DROP INDEX [IX_Inventories_productid] ON [Inventories];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618143845_update-inventory'
)
BEGIN
    DECLARE @var33 sysname;
    SELECT @var33 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Inventories]') AND [c].[name] = N'productid');
    IF @var33 IS NOT NULL EXEC(N'ALTER TABLE [Inventories] DROP CONSTRAINT [' + @var33 + '];');
    ALTER TABLE [Inventories] DROP COLUMN [productid];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618143845_update-inventory'
)
BEGIN
    DECLARE @var34 sysname;
    SELECT @var34 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Inventories]') AND [c].[name] = N'quantity');
    IF @var34 IS NOT NULL EXEC(N'ALTER TABLE [Inventories] DROP CONSTRAINT [' + @var34 + '];');
    ALTER TABLE [Inventories] DROP COLUMN [quantity];
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618143845_update-inventory'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240618143845_update-inventory', N'8.0.6');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618150023_update-inventory-table'
)
BEGIN
    CREATE TABLE [Inventory_Products] (
        [id] int NOT NULL IDENTITY,
        [inventoryId] int NULL,
        [productid] int NULL,
        [quantity] int NOT NULL,
        [created] nvarchar(max) NULL,
        [updated] nvarchar(max) NULL,
        CONSTRAINT [PK_Inventory_Products] PRIMARY KEY ([id]),
        CONSTRAINT [FK_Inventory_Products_Inventories_inventoryId] FOREIGN KEY ([inventoryId]) REFERENCES [Inventories] ([Id]),
        CONSTRAINT [FK_Inventory_Products_Products_productid] FOREIGN KEY ([productid]) REFERENCES [Products] ([id])
    );
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618150023_update-inventory-table'
)
BEGIN
    CREATE INDEX [IX_Inventory_Products_inventoryId] ON [Inventory_Products] ([inventoryId]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618150023_update-inventory-table'
)
BEGIN
    CREATE INDEX [IX_Inventory_Products_productid] ON [Inventory_Products] ([productid]);
END;
GO

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20240618150023_update-inventory-table'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20240618150023_update-inventory-table', N'8.0.6');
END;
GO

COMMIT;
GO

