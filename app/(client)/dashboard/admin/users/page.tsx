"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Search, Trash2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from API
  const users = [
    {
      id: "1",
      displayName: "Ahmed Bennani",
      phoneNumber: "+212600000001",
      email: "ahmed@example.com",
      isActive: true,
      subscriptionExpiry: null,
      createdAt: "2024-01-15",
      carsCount: 3,
    },
    {
      id: "2",
      displayName: "Fatima Alaoui",
      phoneNumber: "+212600000002",
      email: "fatima@example.com",
      isActive: true,
      subscriptionExpiry: "2024-12-31",
      createdAt: "2024-02-20",
      carsCount: 1,
    },
    {
      id: "3",
      displayName: "Youssef Tazi",
      phoneNumber: "+212600000003",
      email: "youssef@example.com",
      isActive: false,
      subscriptionExpiry: null,
      createdAt: "2024-03-10",
      carsCount: 0,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600 mt-2">
                Administrez les comptes utilisateurs de la plateforme
              </p>
            </div>
            <Link href="/dashboard/admin">
              <Button variant="outline">Retour au Dashboard</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilisateurs Actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {users.filter((u) => u.isActive).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilisateurs Inactifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {users.filter((u) => !u.isActive).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Abonnements Actifs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {users.filter((u) => u.subscriptionExpiry).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Actions */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Liste des Utilisateurs</CardTitle>
                  <CardDescription>
                    Gérez tous les comptes utilisateurs enregistrés
                  </CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un Utilisateur
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par nom, téléphone ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Abonnement</TableHead>
                    <TableHead>Véhicules</TableHead>
                    <TableHead>Inscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {user.id}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{user.phoneNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isActive ? "default" : "secondary"}
                        >
                          {user.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.subscriptionExpiry ? (
                          <Badge variant="outline" className="text-green-600">
                            Actif jusqu'au {user.subscriptionExpiry}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Aucun</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.carsCount} véhicule(s)
                        </Badge>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
