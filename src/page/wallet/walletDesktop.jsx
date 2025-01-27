import React, { useState, useEffect } from "react";
import { createInvestmentApi } from "../../api/investmentApi";
import { createWalletApi, getWalletApi, deleteWalletApi } from "../../api/walletApi";
import { investmentAvailableApi } from "../../api/investmentAvailableApi";
import { deleteInvestmentApi } from "../../api/investmentApi";
import useUser from "../../utils/useUser";

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

function WalletDesktop() {
  const [portfolios, setPortfolios] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [investmentOptions, setInvestmentOptions] = useState([]);

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


  const handleCreatePortfolio = async () => {
    if (newPortfolioName.trim()) {
      const newPortfolio = { name: newPortfolioName, userId: useUser().sub };

      try {
        const createdPortfolio = await createWalletApi(newPortfolio);
        setPortfolios([...portfolios, createdPortfolio]); 
        setNewPortfolioName("");
        setIsCreateDialogOpen(false);
      } catch (error) {
        console.error("Erro ao criar carteira:", error);
      }
    }
  };


  const handleAddInvestment = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsInvestmentDialogOpen(true);
  };


  const handleSelectInvestment = async (investment) => {

    const investmentAmount = investment.amount || investment.minimumInvestment;

    if (selectedPortfolio && investmentAmount) {
      const investmentData = {
        availableInvestmentId: Number(investment.id),
        amount: Number(investmentAmount),
        walletId: Number(selectedPortfolio.id),
      };

      try {

        const updatedPortfolio = await createInvestmentApi(
          selectedPortfolio.id,
          investmentData
        );


        setPortfolios((prevPortfolios) =>
          prevPortfolios.map((p) =>
            p.id === updatedPortfolio.id
              ? { ...p, investments: updatedPortfolio.investments } 
              : p
          )
        );


        const updatedPortfolios = await getWalletApi(); 
        setPortfolios(updatedPortfolios); 
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


  const handleDeleteInvestment = async (investmentId) => {
    try {
      await deleteInvestmentApi(investmentId);

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
      ); 
    } catch (error) {
      console.error("Erro ao excluir carteira:", error);
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        style={{ fontSize: "30px", fontWeight: "bold" }}
        gutterBottom
      >
        Minhas Carteiras
      </Typography>

      {/* Lista de Carteiras */}
      {portfolios.map((portfolio) => (
        <Card
          key={portfolio.id}
          sx={{ marginBottom: 2 }}
          style={{ width: "60vw" }}
        >
          <CardContent>
            <Typography variant="h5" style={{marginBottom: "30px"}}>
              {portfolio.name}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteWallet(portfolio.id)}
                style={{ marginLeft: "20px", float: "right" }} 
              >
                Excluir
              </Button>
            </Typography>
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
                        style={{ marginLeft: "20px" }}
                      >
                        Deletar Investimento
                      </Button>
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddInvestment(portfolio)}
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
                  style={{ marginLeft: "20px" }}
                >
                  Selecionar
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsInvestmentDialogOpen(false)}
            color="primary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsCreateDialogOpen(true)}
        sx={{ marginTop: 2 }}
      >
        Criar Nova Carteira
      </Button>
    </div>
  );
}

export default WalletDesktop;
