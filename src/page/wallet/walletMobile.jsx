import React, { useState, useEffect } from "react";
import { createInvestmentApi } from "../../api/investmentApi";
import { createWalletApi, getWalletApi, deleteWalletApi } from "../../api/walletApi";
import { investmentAvailableApi } from "../../api/investmentAvailableApi";
import { deleteInvestmentApi } from "../../api/investmentApi";
import useUser from "../../utils/useUser";

// Importando componentes do Material UI
import {
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function WalletMobile() {
  const [portfolios, setPortfolios] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [investmentOptions, setInvestmentOptions] = useState([]);

  // Carregar carteiras e investimentos disponíveis
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPortfolios = await getWalletApi();
        setPortfolios(fetchedPortfolios);
        const availableInvestments = await investmentAvailableApi();
        setInvestmentOptions(availableInvestments);
      } catch (error) {
        console.error(
          "Erro ao carregar carteiras ou investimentos disponíveis:",
          error
        );
      }
    }

    fetchData();
  }, []);

  // Função para criar uma nova carteira
  const handleCreatePortfolio = async () => {
    if (newPortfolioName.trim()) {
      const newPortfolio = { name: newPortfolioName, userId: useUser().sub };

      try {
        const createdPortfolio = await createWalletApi(newPortfolio);
        setPortfolios([...portfolios, createdPortfolio]); // Atualiza a lista de carteiras
        setNewPortfolioName("");
        setIsCreateDialogOpen(false);
      } catch (error) {
        console.error("Erro ao criar carteira:", error);
      }
    }
  };

  // Função para abrir o diálogo de adicionar investimento
  const handleAddInvestment = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsInvestmentDialogOpen(true);
  };

  // Função para adicionar o investimento na carteira selecionada
  const handleSelectInvestment = async (investment) => {

    const investmentAmount = investment.amount || investment.minimumInvestment;

    if (selectedPortfolio && investmentAmount) {
      const investmentData = {
        availableInvestmentId: Number(investment.id),
        amount: Number(investmentAmount),
        walletId: Number(selectedPortfolio.id),
      };

      try {
        // Adiciona o investimento na carteira
        const updatedPortfolio = await createInvestmentApi(
          selectedPortfolio.id,
          investmentData
        );

        // Atualiza a lista de carteiras no estado para refletir a carteira com o novo investimento
        setPortfolios((prevPortfolios) =>
          prevPortfolios.map((p) =>
            p.id === updatedPortfolio.id
              ? { ...p, investments: updatedPortfolio.investments } // Atualiza a lista de investimentos na carteira
              : p
          )
        );

        // Recarrega a lista de investimentos da carteira, se necessário
        const updatedPortfolios = await getWalletApi(); // Recarregar as carteiras
        setPortfolios(updatedPortfolios); // Atualiza o estado com a lista recarregada
      } catch (error) {
        console.error("Erro ao adicionar investimento:", error);
      }
    } else {
      console.error(
        "Investimento não contém o valor esperado ou não há carteira selecionada."
      );
    }

    setIsInvestmentDialogOpen(false);
  };

  // Função para deletar um investimento
  const handleDeleteInvestment = async (investmentId) => {
    try {
      await deleteInvestmentApi(investmentId);

      // Atualiza a lista de investimentos na carteira após deletar
      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((portfolio) => ({
          ...portfolio,
          investments: portfolio.investments.filter(
            (investment) => investment.id !== investmentId
          ),
        }))
      );
    } catch (error) {
      console.error("Erro ao deletar investimento:", error);
    }
  };

  const handleDeleteWallet = async (id) => {
    try {
      await deleteWalletApi(id);
      setPortfolios((prevPortfolios) =>
        prevPortfolios.filter((p) => p.id !== id)
      ); // Remove a carteira do estado
    } catch (error) {
      console.error("Erro ao excluir carteira:", error);
    }
  };

  return (
    <div style={{ padding: "1rem"}}>
      <Typography
        variant="h4"
        style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}
      >
        Minhas Carteiras
      </Typography>

      {/* Lista de Carteiras */}
      {portfolios.map((portfolio) => (
        <Card
          key={portfolio.id}
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "100%" }}
        >
          <CardContent>
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              {portfolio.name}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteWallet(portfolio.id)}
                style={{ marginLeft: "20px", float: "right" }} // Botão alinhado à direita
              >
                Excluir
              </Button>
            </Typography>

            {/* Accordion para exibir os investimentos na carteira */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">Investimentos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {portfolio.investments?.map((investment) => (
                    <ListItem key={investment.id}>
                      <ListItemText
                        primary={`Investido: R$${investment.amount} - Empresa: ${investment.availableInvestment.companyName}`}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteInvestment(investment.id)}
                        style={{ marginLeft: "10px" }}
                      >
                        Deletar
                      </Button>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddInvestment(portfolio)}
                  style={{ marginTop: "10px" }}
                >
                  Adicionar Investimento
                </Button>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      ))}

      {/* Diálogo para Criar Nova Carteira */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      >
        <DialogTitle>Criar Nova Carteira</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome da Carteira"
            type="text"
            fullWidth
            value={newPortfolioName}
            onChange={(e) => setNewPortfolioName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreatePortfolio} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Selecionar Investimento */}
      <Dialog
        open={isInvestmentDialogOpen}
        onClose={() => setIsInvestmentDialogOpen(false)}
      >
        <DialogTitle>Adicionar Investimento</DialogTitle>
        <DialogContent>
          <List>
            {investmentOptions.map((investment) => (
              <ListItem key={investment.id}>
                <ListItemText primary={investment.companyName} />
                <Button
                  variant="contained"
                  onClick={() => handleSelectInvestment(investment)}
                  style={{ marginLeft: "10px" }}
                >
                  Selecionar
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsInvestmentDialogOpen(false)} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsCreateDialogOpen(true)}
        style={{ marginTop: "1.5rem", width: "100%" }}
      >
        Criar Nova Carteira
      </Button>
    </div>
  );
}

export default WalletMobile;
