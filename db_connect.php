<?php
// Arquivo de configuração do banco de dados
require_once 'config.php';

/**
 * Função para estabelecer uma conexão com o banco de dados
 * 
 * @return mysqli A conexão com o banco de dados
 */
function dbConnect() {
    static $conn;
    
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            error_log("Falha na conexão com o banco de dados: " . $conn->connect_error);
            die("Erro ao conectar ao banco de dados. Por favor, tente novamente mais tarde.");
        }
        
        $conn->set_charset("utf8mb4");
    }
    
    return $conn;
}

/**
 * Função para fechar a conexão com o banco de dados
 * 
 * @param mysqli $conn A conexão com o banco de dados a ser fechada
 */
function dbClose($conn) {
    if ($conn instanceof mysqli) {
        $conn->close();
    }
}

/**
 * Função para executar uma consulta SQL preparada
 * 
 * @param string $sql A consulta SQL com placeholders
 * @param string $types Os tipos de dados dos parâmetros (e.g., "ssi" para string, string, integer)
 * @param array $params Os parâmetros para a consulta
 * @return mysqli_stmt|false O statement preparado ou false em caso de erro
 */
function dbQuery($sql, $types = "", $params = []) {
    $conn = dbConnect();
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        error_log("Erro na preparação da consulta: " . $conn->error);
        return false;
    }
    
    if (!empty($types) && !empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    
    if (!$stmt->execute()) {
        error_log("Erro na execução da consulta: " . $stmt->error);
        $stmt->close();
        return false;
    }
    
    return $stmt;
}

/**
 * Função para obter um único resultado de uma consulta
 * 
 * @param string $sql A consulta SQL com placeholders
 * @param string $types Os tipos de dados dos parâmetros
 * @param array $params Os parâmetros para a consulta
 * @return array|null O resultado da consulta ou null se não houver resultados
 */
function dbFetchOne($sql, $types = "", $params = []) {
    $stmt = dbQuery($sql, $types, $params);
    
    if ($stmt === false) {
        return null;
    }
    
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    
    return $row;
}

/**
 * Função para obter múltiplos resultados de uma consulta
 * 
 * @param string $sql A consulta SQL com placeholders
 * @param string $types Os tipos de dados dos parâmetros
 * @param array $params Os parâmetros para a consulta
 * @return array Um array com os resultados da consulta
 */
function dbFetchAll($sql, $types = "", $params = []) {
    $stmt = dbQuery($sql, $types, $params);
    
    if ($stmt === false) {
        return [];
    }
    
    $result = $stmt->get_result();
    $rows = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    
    return $rows;
}

/**
 * Função para inserir dados no banco de dados
 * 
 * @param string $table O nome da tabela
 * @param array $data Um array associativo com os dados a serem inseridos
 * @return int|false O ID do último registro inserido ou false em caso de erro
 */
function dbInsert($table, $data) {
    $keys = array_keys($data);
    $values = array_values($data);
    $types = str_repeat('s', count($values));
    
    $sql = "INSERT INTO " . $table . " (" . implode(", ", $keys) . ") VALUES (" . implode(", ", array_fill(0, count($values), "?")) . ")";
    
    $stmt = dbQuery($sql, $types, $values);
    
    if ($stmt === false) {
        return false;
    }
    
    $insertId = $stmt->insert_id;
    $stmt->close();
    
    return $insertId;
}

/**
 * Função para atualizar dados no banco de dados
 * 
 * @param string $table O nome da tabela
 * @param array $data Um array associativo com os dados a serem atualizados
 * @param string $where A cláusula WHERE da consulta
 * @param string $types Os tipos de dados dos parâmetros da cláusula WHERE
 * @param array $params Os parâmetros da cláusula WHERE
 * @return bool True se a atualização for bem-sucedida, false caso contrário
 */
function dbUpdate($table, $data, $where, $types = "", $params = []) {
    $set = [];
    $values = [];
    
    foreach ($data as $key => $value) {
        $set[] = "$key = ?";
        $values[] = $value;
        $types .= 's';
    }
    
    $sql = "UPDATE " . $table . " SET " . implode(", ", $set) . " WHERE " . $where;
    
    $stmt = dbQuery($sql, $types, array_merge($values, $params));
    
    if ($stmt === false) {
        return false;
    }
    
    $success = $stmt->affected_rows > 0;
    $stmt->close();
    
    return $success;
}
