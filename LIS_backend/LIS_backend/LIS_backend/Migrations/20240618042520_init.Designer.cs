﻿// <auto-generated />
using LIS_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LIS_backend.Migrations
{
    [DbContext(typeof(LISContext))]
    [Migration("20240618042520_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("LIS_backend.Models.Category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("LIS_backend.Models.Inventory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("created")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("locationid")
                        .HasColumnType("int");

                    b.Property<int>("productid")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.Property<string>("updated")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("locationid");

                    b.HasIndex("productid");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("LIS_backend.Models.Invoice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("created")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("date")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("updated")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("userid");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("LIS_backend.Models.Invoice_Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("created")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("invoiceId")
                        .HasColumnType("int");

                    b.Property<int>("productid")
                        .HasColumnType("int");

                    b.Property<int>("quantity")
                        .HasColumnType("int");

                    b.Property<string>("updated")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("invoiceId");

                    b.HasIndex("productid");

                    b.ToTable("Invoice_Products");
                });

            modelBuilder.Entity("LIS_backend.Models.Product", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<int>("categoryid")
                        .HasColumnType("int");

                    b.Property<string>("code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("created")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("updated")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("categoryid");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("LIS_backend.Models.StoreLocation", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("retailname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("retailsystem")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("shortname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("storeid")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("warehouseid")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("StoreLocation");
                });

            modelBuilder.Entity("LIS_backend.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LIS_backend.Models.User_Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("created")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("storeLocationid")
                        .HasColumnType("int");

                    b.Property<string>("updated")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("storeLocationid");

                    b.HasIndex("userid");

                    b.ToTable("User_Locations");
                });

            modelBuilder.Entity("LIS_backend.Models.Inventory", b =>
                {
                    b.HasOne("LIS_backend.Models.StoreLocation", "location")
                        .WithMany()
                        .HasForeignKey("locationid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIS_backend.Models.Product", "product")
                        .WithMany()
                        .HasForeignKey("productid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("location");

                    b.Navigation("product");
                });

            modelBuilder.Entity("LIS_backend.Models.Invoice", b =>
                {
                    b.HasOne("LIS_backend.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("LIS_backend.Models.Invoice_Product", b =>
                {
                    b.HasOne("LIS_backend.Models.Invoice", "invoice")
                        .WithMany()
                        .HasForeignKey("invoiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIS_backend.Models.Product", "product")
                        .WithMany()
                        .HasForeignKey("productid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("invoice");

                    b.Navigation("product");
                });

            modelBuilder.Entity("LIS_backend.Models.Product", b =>
                {
                    b.HasOne("LIS_backend.Models.Category", "category")
                        .WithMany()
                        .HasForeignKey("categoryid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("category");
                });

            modelBuilder.Entity("LIS_backend.Models.User_Location", b =>
                {
                    b.HasOne("LIS_backend.Models.StoreLocation", "storeLocation")
                        .WithMany()
                        .HasForeignKey("storeLocationid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("LIS_backend.Models.User", "user")
                        .WithMany()
                        .HasForeignKey("userid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("storeLocation");

                    b.Navigation("user");
                });
#pragma warning restore 612, 618
        }
    }
}