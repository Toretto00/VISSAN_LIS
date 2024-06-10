-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


SET XACT_ABORT ON

BEGIN TRANSACTION QUICKDBD

CREATE TABLE [Product] (
    [id] int  NOT NULL ,
    [category] int  NOT NULL ,
    [name] string  NOT NULL ,
    [code] string  NOT NULL ,
    [description] string  NOT NULL ,
    [created] string  NOT NULL ,
    [price] int  NOT NULL ,
    [updated] string  NOT NULL ,
    [no] tring  NOT NULL ,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED (
        [code] ASC
    )
)

CREATE TABLE [Category] (
    [id] int  NOT NULL ,
    [name] string  NOT NULL ,
    [code] string  NOT NULL ,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED (
        [id] ASC
    )
)

CREATE TABLE [StoreLocation] (
    [id] int  NOT NULL ,
    [warehouseID] string  NOT NULL ,
    [storeID] string  NOT NULL ,
    [name] string  NOT NULL ,
    [retailSystem] string  NOT NULL ,
    [shortname] string  NOT NULL 
)

CREATE TABLE [User] (
    [id] int  NOT NULL ,
    [username] string  NOT NULL ,
    [password] string  NOT NULL ,
    [storID] string  NOT NULL ,
    [role] string  NOT NULL 
)

CREATE TABLE [Invoice] (
    [id] int  NOT NULL ,
    [date] string  NOT NULL ,
    [status] string  NOT NULL ,
    [userID] int  NOT NULL ,
    [created] string  NOT NULL ,
    [updated] string  NOT NULL 
)

CREATE TABLE [Invoice_Product] (
    [id] int  NOT NULL ,
    [billID] int  NOT NULL ,
    [productID] int  NOT NULL 
)

CREATE TABLE [User_Location] (
    [id] int  NOT NULL ,
    [userID] int  NOT NULL ,
    [storeID] int  NOT NULL 
)

CREATE TABLE [Inventory] (
    [id] int  NOT NULL ,
    [created] string  NOT NULL ,
    [updated] string  NOT NULL ,
    [quantity] int  NOT NULL ,
    [storeID] int  NOT NULL ,
    [productID] int  NOT NULL 
)

ALTER TABLE [Product] WITH CHECK ADD CONSTRAINT [FK_Product_category] FOREIGN KEY([category])
REFERENCES [Category] ([id])

ALTER TABLE [Product] CHECK CONSTRAINT [FK_Product_category]

ALTER TABLE [Invoice] WITH CHECK ADD CONSTRAINT [FK_Invoice_userID] FOREIGN KEY([userID])
REFERENCES [StoreLocation] ([storeID])

ALTER TABLE [Invoice] CHECK CONSTRAINT [FK_Invoice_userID]

ALTER TABLE [Invoice_Product] WITH CHECK ADD CONSTRAINT [FK_Invoice_Product_billID] FOREIGN KEY([billID])
REFERENCES [Invoice] ([id])

ALTER TABLE [Invoice_Product] CHECK CONSTRAINT [FK_Invoice_Product_billID]

ALTER TABLE [Invoice_Product] WITH CHECK ADD CONSTRAINT [FK_Invoice_Product_productID] FOREIGN KEY([productID])
REFERENCES [Product] ([code])

ALTER TABLE [Invoice_Product] CHECK CONSTRAINT [FK_Invoice_Product_productID]

ALTER TABLE [User_Location] WITH CHECK ADD CONSTRAINT [FK_User_Location_userID] FOREIGN KEY([userID])
REFERENCES [User] ([id])

ALTER TABLE [User_Location] CHECK CONSTRAINT [FK_User_Location_userID]

ALTER TABLE [User_Location] WITH CHECK ADD CONSTRAINT [FK_User_Location_storeID] FOREIGN KEY([storeID])
REFERENCES [StoreLocation] ([storeID])

ALTER TABLE [User_Location] CHECK CONSTRAINT [FK_User_Location_storeID]

ALTER TABLE [Inventory] WITH CHECK ADD CONSTRAINT [FK_Inventory_storeID] FOREIGN KEY([storeID])
REFERENCES [StoreLocation] ([storeID])

ALTER TABLE [Inventory] CHECK CONSTRAINT [FK_Inventory_storeID]

ALTER TABLE [Inventory] WITH CHECK ADD CONSTRAINT [FK_Inventory_productID] FOREIGN KEY([productID])
REFERENCES [Product] ([code])

ALTER TABLE [Inventory] CHECK CONSTRAINT [FK_Inventory_productID]

COMMIT TRANSACTION QUICKDBD