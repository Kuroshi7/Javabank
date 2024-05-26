            PreparedStatement consulta = conexao.preparedStatement("SELECT * FROM sua_tabela");
            ResultSet resultSet = comando.executeQuery();

            // Itere sobre os resultados e imprima-os
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String nome = resultSet.getString("nome");
                double salario = resultSet.getDouble("salario");
                
                System.out.println("ID: " + id + ", Nome: " + nome + ", Salário: " + salario);
            }

            resultSet.close();
            statement.close();
 

            